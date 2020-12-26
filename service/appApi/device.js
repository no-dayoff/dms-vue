/*
 * @Author: lihuazheng
 * @Date: 2020-12-22 13:07:31
 * @LastEditTime: 2020-12-26 20:24:37
 * @FilePath: \dms-vue\service\appApi\device.js
 */
const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();
function parseQueryString(url) {
  // 先将字符串通过 split 方法，以 "?" 为分割符将其分割成数组；
  // 该数组有两个元素，第一个为空字符串，第二个为 url 参数字符串
  let arr = url.split("?");
  // 将参数字符串以 "&" 符号为分隔符进行分割
  let params = arr[1].split("&");
  // 定义一个数组用于存储参数
  let obj = {};
  // 通过循环将参数以键值对的形式存储在变量 obj 中
  for (let i = 0; i < params.length; i++) {
    let arr_params = params[i].split("=");
    obj[arr_params[0]] = arr_params[1];
  }

  return obj;
}
router.get("/getDeviceCheck", async ctx => {
  ctx.body = "<h1>getDeviceCheck</h1>";
  //*取得Model
  const Device = mongoose.model("Device");
  await Device.find()
    .exec()
    .then(async result => {
      //*成功返回code=200，并返回成功信息
      ctx.body = {
        code: 200,
        message: result
      };
    })
    .catch(error => {
      //*失败返回code=500，并返回错误信息
      ctx.body = {
        code: 500,
        message: error
      };
    });
});
router.get("/postDeviceUpdate", async ctx => {
  let newObj = parseQueryString(ctx.request.url);
  let ID = newObj.ID;
  let Name = newObj.Name;
  let Dtype = newObj.Dtype;
  let BuyDate = newObj.BuyDate;
  let Supplier = newObj.Supplier;
  let Price = newObj.Price;
  //*取得Model
  const Device = mongoose.model("Device");
  //*用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await Device.updateOne({ Did: ID }, { Name: Name ,Dtype:Dtype,BuyDate:BuyDate,Supplier:Supplier,Price:Price})
    .exec()
    .then(async result => {
      console.log(result);
      // n: 1”：查询到1条记录。
      // “nModified: 1”：需要修改1条记录。（如果修改值和原始值相同，则需要修改的就是0条）
      // “ok: 1”：修改成功1条。
      if (result.nModified == 0) {
        ctx.body = {
          code: 204,
          message: "没有数值被更改了"
        };
      } else {
        ctx.body = {
          code: 200,
          message: result.nModified
        };
      }
    })
    .catch(error => {
      //*失败返回code=500，并返回错误信息
      ctx.body = {
        code: 500,
        message: error
      };
    });
});

router.get("/deleteDeviceById", async ctx => {
  console.log(parseQueryString(ctx.request.url));
  let newObj = parseQueryString(ctx.request.url);
  let ID = newObj.ID;
  const Device = mongoose.model("Device");
  await Device.deleteOne({ Did: ID })
    .exec()
    .then(async result => {
      // n:要删除的文档数量。 deletedCount:删除的文档数量。
      ctx.body = {
        code: 200,
        message: result
      };
      })
    .catch(error => {
     console.log(error)
    });
});


router.post("/insertNewDevice", async ctx => {
  // let newObj = parseQueryString(ctx.request.url);
  // console.log(newObj)
  
  const Device = mongoose.model("Device");
  let newDevice=new Device(ctx.request.body);
  await newDevice.save()
    .then(async result => {
      ctx.body = {
        code: 200,
        message: result
      };
      })
    .catch(error => {
      ctx.body = {
        code: 500,
        message: error
      };
    });
});
module.exports = router;

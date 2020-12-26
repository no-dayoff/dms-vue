/*
 * @Author: lihuazheng
 * @Date: 2020-12-23 20:14:42
 * @LastEditTime: 2020-12-24 17:13:12
 * @FilePath: \dms-vue\service\appApi\timetable.js
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
router.post('/',async(ctx)=>{
  ctx.body="这是time操作首页"
})
router.post('/queryTimetable',async (ctx)=>{
  let Term=ctx.request.body.Term
  const Timetable = mongoose.model('Timetable')
 await Timetable.find({Term:Term}).exec().then(async(result)=>{
  //！这里不能再回调了，不然result找不到定义
   ctx.body={
     code:200,
     message:result
   }
 })
 .catch((error)=>{
  ctx.body={
    code:500,
    message:error
  }
 })
})
router.post('/updateTimetable',async (ctx)=>{
  let newTimetable=ctx.request.body
  let Name=newTimetable.Name
  let Term=newTimetable.Term
  let Room=newTimetable.Room
  const Timetable = mongoose.model('Timetable')
 await Timetable.updateOne({Name:Name},{Term:Term,Room:Room}).exec().then(async(result)=>{
   ctx.body={
     code:200,
     message:result
   }
 })
 .catch((error)=>{
   console.log(error)
  ctx.body={
    code:500,
    message:error
  }
 })
})
router.post('/queryLab',async ctx=>{
  let Room=ctx.request.body.Room
  let data=[]
  let num0=0
  let num1=0
  let num2=0
  let num3=0
  const Timetable = mongoose.model('Timetable')
  await Timetable.find({Room:Room}).exec().then(async(result)=>{
    for(let i=0;i<result.length;i++){
      if(result[i].Term=='2020年秋季学期'){
        num0++
      }
      if(result[i].Term=='2021年春季学期'){
        num1++
      }
      if(result[i].Term=='2021年秋季学期'){
        num2++
      }
      if(result[i].Term=='2022年春季学期'){
        num3++
      }
    }
    data.push(num0,num1,num2,num3)
    ctx.body={
      code:200,
      message:data
    }
    
  })

})
module.exports = router;
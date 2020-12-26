/*
 * @Author: lihuazheng
 * @Date: 2020-12-26 12:56:35
 * @LastEditTime: 2020-12-26 18:36:52
 * @FilePath: \dms-vue\service\appApi\borrow.js
 */
const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();
function parseDate(rawDate){
  let hours;
  let day;
  let month;
  let minutes;
  let seconds;

  if (rawDate.getHours().toString().length === 1) {
    hours = `0${rawDate.getHours()}`;
  } else {
    hours = `${rawDate.getHours()}`;
  }

  if (rawDate.getDate().toString().length === 1) {
    day = `0${rawDate.getDate()}`;
  } else {
    day = `${rawDate.getDate()}`;
  }

  if (rawDate.getMonth().toString().length === 1) {
    month = `0${rawDate.getMonth() + 1}`;
  } else {
    month = `${rawDate.getMonth() + 1}`;
  }
  if (rawDate.getMinutes().toString().length === 1) {
    minutes = `0${rawDate.getMinutes()+ 1}`;
  } else {
    minutes = `${rawDate.getMinutes() + 1}`;
  }
  if (rawDate.getSeconds().toString().length === 1) {
    seconds = `0${rawDate.getSeconds()+ 1}`;
  } else {
    seconds = `${rawDate.getSeconds() + 1}`;
  }
return `${rawDate.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}` ;
}
router.post('/studentBorrow',async ctx=>{
  // ctx.body="这是borrow首页"
   //*取得Model
   const Borrow = mongoose.model('Borrow')
   //*把从前端接收的POST数据封装成一个新的user对象
   let newBorrow = new Borrow(ctx.request.body)
   //*用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
   await newBorrow.save().then(()=>{
       //*成功返回code=200，并返回成功信息
       ctx.body={
           code:200,
           message:'申请成功'
       }
   }).catch(error=>{
        //*失败返回code=500，并返回错误信息
       ctx.body={
           code:500,
           message:error
       }
   })
})
router.post('/StudentBorrowCheck',async ctx=>{
   const Borrow = mongoose.model('Borrow')
   let Borrower=ctx.request.body.Borrower
  
  await Borrow.find({ Borrower: Borrower }).exec().then( async result=>{
    ctx.body={
      code:200,
      message:result
    }
  })

})

router.post("/StudentCheckReturn", async ctx => {
   const Borrow = mongoose.model('Borrow')
  let Borrower=ctx.request.body.Borrower
 
 await Borrow.find({ Borrower: Borrower }).exec().then( async result=>{
   let arr=[]
   for(let i=0;i<result.length;i++){
     if(result[i].State=='使用中')
     arr.push(result[i])
   }
   ctx.body={
     code:200,
     message:arr
   }
 })
})
router.post("/StudentReturn",async ctx=>{
  const Borrow = mongoose.model('Borrow')
  let getDate=ctx.request.body.Date
  let State='已归还'
  let ReturnDate=parseDate(new Date())
 await Borrow.updateOne({ Date: getDate }, { State: State ,Date:ReturnDate})
 .exec().then( async result=>{
   ctx.body={
     code:200,
     message:result
   }
 }).catch(error=>{
   console.log(error)
 })
})
router.post("/BorrowPass",async ctx=>{
  const Borrow = mongoose.model('Borrow')
  let getDate=ctx.request.body.Date
  let State='使用中'
  let ReturnDate=parseDate(new Date())
 await Borrow.updateOne({ Date: getDate }, { State: State ,Date:ReturnDate})
 .exec().then( async result=>{
   ctx.body={
     code:200,
     message:result
   }
 }).catch(error=>{
   console.log(error)
 })
})
router.post("/BorrowFail",async ctx=>{
  const Borrow = mongoose.model('Borrow')
  let getDate=ctx.request.body.Date
  let State='未通过'
  let ReturnDate=parseDate(new Date())
 await Borrow.updateOne({ Date: getDate }, { State: State ,Date:ReturnDate})
 .exec().then( async result=>{
   ctx.body={
     code:200,
     message:result
   }
 }).catch(error=>{
   console.log(error)
 })
})
router.get("/GetAllBorrow",async ctx=>{
  const Borrow = mongoose.model('Borrow')
  let State='待审核'
 await Borrow.find({ State: State })
 .exec().then( async result=>{
   ctx.body={
     code:200,
     message:result
   }
 })
})
router.get("/GetReturnAlready",async ctx=>{
  const Borrow = mongoose.model('Borrow')
  let State='已归还'
 await Borrow.find({ State: State })
 .exec().then( async result=>{
   ctx.body={
     code:200,
     message:result
   }
 })
})
router.get("/GetBorrowAlready",async ctx=>{
  const Borrow = mongoose.model('Borrow')
  let State='使用中'
 await Borrow.find({ State: State })
 .exec().then( async result=>{
   ctx.body={
     code:200,
     message:result
   }
 })
})
module.exports=router;

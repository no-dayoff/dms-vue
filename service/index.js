/*
 * @Author: lihuazheng
 * @Date: 2020-12-18 19:24:01
 * @LastEditTime: 2020-12-26 12:59:30
 * @FilePath: \dms-vue\service\index.js
 */
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const {connect , initSchemas} = require('./database/init.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
let user = require('./appApi/user.js')
let device = require('./appApi/device.js')
let timetable = require('./appApi/timetable.js')
let student = require('./appApi/student.js')
let borrow = require('./appApi/borrow.js')
let router = new Router();
app.use(cors());
app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())
router.use('/user',user.routes())
router.use('/device',device.routes())
router.use('/timetable',timetable.routes())
router.use('/student',student.routes())
router.use('/borrow',borrow.routes())


//!立即执行函数
;(async () =>{
  await connect()
  initSchemas()
})()



app.use(async(ctx)=>{
  ctx.body='<h1>indexjs</h1>'
})
app.listen(3000,()=>{
  console.log('[Server] starting at port 3000')
})
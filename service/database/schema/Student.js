/*
 * @Author: lihuazheng
 * @Date: 2020-12-25 16:57:25
 * @LastEditTime: 2020-12-25 17:23:01
 * @FilePath: \dms-vue\service\database\schema\Student.js
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10
//创建我们的用户Schema
const studentSchema = new Schema({
    UserId:ObjectId,
    username:{unique:true,type:String},
    password:String,
    name:String,
    dept:String

},{
    collection:'Student',
    versionKey: false
})
//每次存储数据时都要执行
studentSchema.pre('save', function(next){
  //let user = this
  console.log(this)
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
      if(err) return next(err)
      bcrypt.hash(this.password,salt, (err,hash)=>{
          if(err) return next(err)
          this.password = hash
          next()
      }) 

  })
})
studentSchema.methods = {
    //密码比对的方法
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('Student',studentSchema)
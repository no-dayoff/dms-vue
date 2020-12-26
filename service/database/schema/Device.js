/*
 * @Author: lihuazheng
 * @Date: 2020-12-22 13:04:24
 * @LastEditTime: 2020-12-26 18:59:33
 * @FilePath: \dms-vue\service\database\schema\Device.js
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

const deviceSchema = new Schema({
    Id:ObjectId,
    Did:String,
    Name:String,
    Dtype:String,
    BuyDate:String,
    Supplier:String,
    Price:String,
},{
  collection:'Device',
  versionKey: false
}
)

mongoose.model('Device',deviceSchema)
/*
 * @Author: lihuazheng
 * @Date: 2020-12-23 20:11:17
 * @LastEditTime: 2020-12-23 20:14:25
 * @FilePath: \dms-vue\service\database\schema\Timetable.js
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

const timetableSchema = new Schema({
    Id:ObjectId,
    Name:String,
    Room:String,
    Term:String,
    Need:String,

},{
  collection:'Timetable',
  versionKey: false
}
)

mongoose.model('Timetable',timetableSchema)
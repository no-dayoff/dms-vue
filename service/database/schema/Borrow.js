/*
 * @Author: lihuazheng
 * @Date: 2020-12-26 12:44:19
 * @LastEditTime: 2020-12-26 12:56:20
 * @FilePath: \dms-vue\service\database\schema\Borrow.js
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

const BorrowSchema = new Schema({
    Id:ObjectId,
    Name:String,
    Borrower:String,
    Dept:String,
    Num:String,
    State:{type:String,default:'待审核'},
    Date:String,

},{
  collection:'Borrow',
  versionKey: false
}
)

mongoose.model('Borrow',BorrowSchema)
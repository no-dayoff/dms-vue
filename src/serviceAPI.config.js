/*
 * @Author: lihuazheng
 * @Date: 2020-12-18 19:13:28
 * @LastEditTime: 2020-12-26 18:35:25
 * @FilePath: \dms-vue\src\serviceAPI.config.js
 */
const LOCALURL = "http://localhost:3000/"
const URL = {
    registerUser:LOCALURL+'user/register',  //用户注册
    loginUser:LOCALURL+'user/login',   //用户登陆
    getDeviceCheck:LOCALURL+'device/getDeviceCheck', //获得设备信息
    postDeviceUpdate:LOCALURL+'device/postDeviceUpdate',   //修改设备信息
    deleteDeviceById:LOCALURL+'device/deleteDeviceById',   //删除设备信息
    insertNewDevice:LOCALURL+'device/insertNewDevice',    //添加新设备信息
    queryTimetable:LOCALURL+'timetable/queryTimetable',   //查询课程表
    updateTimetable:LOCALURL+'timetable/updateTimetable',   //修改课程表
    queryLab:LOCALURL+'timetable/queryLab',  // 获取实验室数据
    registerStudent:LOCALURL+'student/registerStudent',   //学生注册
    loginStudent:LOCALURL+'student/loginStudent',
    StudentBorrowCheck:LOCALURL+'borrow/StudentBorrowCheck',
    studentBorrow:LOCALURL+'borrow/studentBorrow',
    StudentCheckReturn:LOCALURL+'borrow/StudentCheckReturn',
    StudentReturn:LOCALURL+'borrow/StudentReturn',
    GetAllBorrow:LOCALURL+'borrow/GetAllBorrow',
    BorrowPass:LOCALURL+'borrow/BorrowPass',
    GetBorrowAlready:LOCALURL+'borrow/GetBorrowAlready',
    GetReturnAlready:LOCALURL+'borrow/GetReturnAlready',
    BorrowFail:LOCALURL+'borrow/BorrowFail',
}

module.exports = URL
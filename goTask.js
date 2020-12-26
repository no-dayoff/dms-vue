/*
 * @Author: lihuazheng
 * @Date: 2020-12-22 14:14:53
 * @LastEditTime: 2020-12-23 00:07:30
 * @FilePath: \dms-vue\goTask.js
 */
var ID="0277";    //声明一个登录名             
var Name="kkbc6aaas";     //声明登录时的时间戳  
var jsonDdatabase={"ID":ID,"Name":Name}; //组成JSON字符串
var db = connect('dms-vue');   //链接数据库
db.Device.insert(jsonDdatabase);  //插入数据

print('[demo]log  print success');  //没有错误显示成功
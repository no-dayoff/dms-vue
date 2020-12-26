/*
 * @Author: lihuazheng
 * @Date: 2020-12-17 14:31:49
 * @LastEditTime: 2020-12-26 18:22:22
 * @FilePath: \dms-vue\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/pages/Index'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import StudentRegister from '@/components/pages/StudentRegister'
import StudentIndex from '@/components/pages/StudentIndex'
import DefaultPage from '@/components/pages/DefaultPage'
import DeviceCheck from '@/components/pages/DeviceManage/DeviceCheck'
import TimeTable from '@/components/pages/LabUsage/TimeTable'
import LabAnalyse from '@/components/pages/LabUsage/LabAnalyse'
import DeviceBorrow from '@/components/pages/DeviceBorrow/DeviceBorrow'
import DeviceGetReturn from '@/components/pages/DeviceBorrow/DeviceGetReturn'
import DeviceGetBorrow from '@/components/pages/DeviceBorrow/DeviceGetBorrow'
import NewDevice from '@/components/pages/DeviceUsage/NewDevice'
import DeviceScrap from '@/components/pages/DeviceUsage/DeviceScrap'
import DeviceMaintain from '@/components/pages/DeviceUsage/DeviceMaintain'
import DeviceApply from '@/components/pages/DeviceUsage/DeviceApply'
import StudentBorrow from '@/components/pages/StudentPages/StudentBorrow'
import StudentReturn from '@/components/pages/StudentPages/StudentReturn'
import StudentDefault from '@/components/pages/StudentPages/StudentDefault'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path: '/studentregister',
    component:StudentRegister
  },
  {
    path: '/studentindex',
    component:StudentIndex,
    children:[{
      path:'/studentdefault',
      component:StudentDefault
    },{
      path:'/studentborrow',
      component:StudentBorrow
    },{
      path:'/studentreturn',
      component:StudentReturn
    
  }]}
  ,
  {
    path: '/index',component: Index,
    children:[{
      path:'/',
      name:'首页',
      component:DefaultPage
    },
    {
      path:'/timetable',
      name:'课程安排',
      component:TimeTable
    },
    {
      path:'/devicecheck',
      component:DeviceCheck
    },{
      path:'/newdevice',
      component:NewDevice
    },{
      path:'/labanalyse',
      component:LabAnalyse
    },{
      path:'/deviceborrow',
      component:DeviceBorrow
    },{
      path:'/devicegetreturn',
      component:DeviceGetReturn
    },{
      path:'/devicegetborrow',
      component:DeviceGetBorrow
    },{
      path:'/devicescrap',
      component:DeviceScrap
    },{
      path:'/devicemaintain',
      component:DeviceMaintain
    },{
      path:'/deviceapply',
      component:DeviceApply
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'
import SortAdd from '@/components/SortAdd'
import GoodAdd from '@/components/GoodAdd'
import NoticeAdd from '@/components/NoticeAdd'
import NoticeSelect from '@/components/NoticeSelect'
import HotViewHome from '@/components/HotViewHome'

Vue.use(Router)

export default new Router({
  mode:"history",//去除哈希值的#号
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/index',
      name: 'Index',
      components: {
        default:Index,
        main:SortAdd
      }
    },{
      path: '/goodAdd',
      name: 'GoodAdd',
      component: GoodAdd
    },{
      path: '/noticeAdd',
      name: 'NoticeAdd',
      component: NoticeAdd
    },{
      path: '/noticeSelect',
      name: 'NoticeSelect',
      component: NoticeSelect
    },{
      path: '/hotViewHome',
      name: 'HotViewHome',
      component: HotViewHome
    }
  ]
})
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error);
}
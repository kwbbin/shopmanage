import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'
import SortAdd from '@/components/SortAdd'
import GoodAdd from '@/components/GoodAdd'

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
    }
  ]
})
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error);
}
import Vue from 'vue'
import Router from 'vue-router'
import Invite from '@/pages/invite' // 邀请函

import detailed from '@/pages/detailed' // 活动详情

import works from '@/pages/works' // 作品列表

import help from '@/pages/helpRegistered' // 助力注册
import goods from '@/pages/goodsRegistered' // 助力用户完成页面

import company_info from '@/pages/company_info' // 公司注册
import exhibitors from '@/pages/exhibitors' // 公司注册完成页面

import productAll from '@/pages/product_all' // 所有产品列表
import productList from '@/pages/productList' // 产品细节

import questToken from '@/pages/questToken' // 请求token链接页面
import questFinish from '@/pages/questFinish' // 请求token完成页面

import helpPay from '@/pages/helpPay' //
import helpSuccessful from '@/pages/helpSuccessful' //

import login from '@/pages/login' // 登录页面
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/compid/31ef22e8-09a4-43f1-9d1f-02d3632c1c29'
    },
    {
      path: '/compid/:id',
      name: 'compid',
      component: Invite
    },
    {
      path: '/exhibitors',
      name: 'exhibitors',
      component: exhibitors
    },
    {
      path: '/productList/:id',
      name: 'productList',
      component: productList
    },
    {
      path: '/productAll',
      name: 'productAll',
      component: productAll
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/helpPay',
      name: 'helpPay',
      component: helpPay
    },
    {
      path: '/helpSuccessful',
      name: 'helpSuccessful',
      component: helpSuccessful
    },
    {
      path: '/detailed/:id',
      name: 'detailed',
      component: detailed
    },
    {
      path: '/works',
      name: 'works',
      component: works
    },
    {
      path: '/company_info',
      name: 'company_info',
      component: company_info
    },
    {
      path: '/questToken',
      name: 'questToken',
      component: questToken
    },
    {
      path: '/questFinish',
      name: 'questFinish',
      component: questFinish
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Login = () => import('/page/Login/login.vue')
const Register = () => import('/page/Login/register.vue')
const Home = () => import('/page/Home/home.vue')
const GoodS = () => import('/page/Goods/goods.vue')
const goodsDetails = () => import('/page/Goods/goodsDetails.vue')
const RefreshGoods = () => import('/page/Refresh/refreshgoods.vue')
const Cart = () => import('/page/Cart/cart.vue')
const order = () => import('/page/Order/order.vue')
const orderDetail = () => import('/page/User/children/orderDetail.vue')
const user = () => import('/page/User/user.vue')
const orderList = () => import('/page/User/children/order.vue')
const information = () => import('/page/User/children/information.vue')
const addressList = () => import('/page/User/children/addressList.vue')
const checkout = () => import('/page/Checkout/checkout.vue')
const payment = () => import('/page/Order/payment.vue')
const paysuccess = () => import('/page/Order/paysuccess.vue')
const Alipay = () => import('/page/Order/alipay.vue')
const Wechat = () => import('/page/Order/wechat.vue')
const QQpay = () => import('/page/Order/qqpay.vue')
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      // redirect: '/home',
      children: [
        {path: '', component: Home},
        {path: 'goods', component: GoodS},
        {path: 'goodsDetails/:id', name: 'goodsDetails', component: goodsDetails},
        {path: '/refreshgoods', name: 'refreshgoods', component: RefreshGoods}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/cart', name: 'cart', component: Cart},
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [
        {path: 'paysuccess', name: 'paysuccess', component: paysuccess},
        {path: 'payment/:orderSn', name: 'payment', component: payment},
        {path: 'alipay', name: 'alipay', component: Alipay},
        {path: 'wechat', name: 'wechat', component: Wechat},
        {path: 'qqpay', name: 'qqpay', component: QQpay}
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: 'orderList', component: orderList},
        {path: 'orderDetail/:orderSn', name: 'orderDetail', component: orderDetail},
        {path: 'information', name: 'information', component: information},
        {path: 'addressList', name: 'addressList', component: addressList}
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import { refresh } from './api'
import { Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option } from 'element-ui'
import { getStore } from '/utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
import { setStore } from './utils/storage'
Vue.use(VueContentPlaceholders)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/', '/goods', '/login', '/register', '/goodsDetails', '/refreshgoods'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  refresh({token: getStore('token')}).then(res => {
    store.commit('RECORD_USERINFO', res.user)
    setStore('token', res.token)
    if (to.path === '/login') { //  跳转到
      next({path: '/'})
    }
    next()
  }).catch(_ => {
    if (whiteList.indexOf(to.path) !== -1 || to.path.startsWith('/goodsDetails')) { // 白名单
      store.state.userInfo = JSON.parse(getStore('userInfo'))
      next()
    } else {
      next('/login')
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

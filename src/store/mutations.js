import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  EDIT_CART,
  DESTORY_USERINFO
} from './mutation-types'
import { setStore, getStore } from '../utils/storage'
export default {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 加入购物车
  [ADD_CART] (state, {productId, salePrice, productName, productImg, productNum = 1}) {
    let cart = state.cartList // 购物车
    let falg = true
    if (cart.length) {        // 有内容
      cart.forEach(item => {
        if (item.goods.id === productId) {
          if (item.nums >= 0) {
            falg = false
            item.nums += productNum
          }
        }
      })
    }
    if (!cart.length || falg) {
      let newcart = {
        nums: productNum,
        checked: true,
        goods: {
          id: productId,
          name: productName,
          price: salePrice,
          goods_front_image: productImg
        }
      }
      cart.push(newcart)
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', cart)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    state.showCart = showCart
  },
  // 修改购物车
  [EDIT_CART] (state, {productId, productNum, checked}) {
    let cart = state.cartList
    if (productNum) {
      cart.forEach((item, i) => {
        if (item.id === productId) {
          item.nums = productNum
          item.checked = checked
        }
      })
    } else if (productId) {
      cart.forEach((item, i) => {
        if (item.id === productId) {
          cart.splice(i, 1)
        }
      })
    } else {
      cart.forEach((item) => {
        item.checked = checked
      })
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  [DESTORY_USERINFO] (state) {
    state.login = false
    state.cartList = []
    state.userInfo = null
  }
}

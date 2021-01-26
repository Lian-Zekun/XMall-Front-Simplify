import http from './public'

// 商品列表
export const getAllGoods = () => {
  return http.fetchGet('/api/search/')
}
// 商品详情
export const productDet = (id) => {
  return http.fetchGet(`/api/goods/${id}/`)
}
// 快速搜索
export const getSearch = (params) => {
  return http.fetchGet('/api/search/', params)
}
// 获取购物车列表
export const getCartList = () => {
  return http.fetchGet('/api/carts/')
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/api/carts/', params)
}
// 删除购物车
export const delCart = (id) => {
  return http.fetchDelete(`/api/carts/${id}/`)
}
// 编辑购物车
export const cartEdit = (id, params) => {
  return http.fetchUpdate(`/api/carts/${id}/`, params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/api/carts/update_all_checked/', params)
}
// 删除购物车
export const cartDel = (id) => {
  return http.fetchDelete(`/api/carts/${id}/`)
}
// 删除购物车勾选商品
export const delCartChecked = () => {
  return http.fetchDelete('/api/carts/delete_all_checked/')
}
// 获取用户地址列表
export const addressList = () => {
  return http.fetchGet('/api/address/')
}
// 获取地址详情
export const getAddress = (id) => {
  return http.fetchGet(`/api/address/${id}/`)
}
// 修改收货地址
export const addressUpdate = (id, params) => {
  return http.fetchUpdate(`/api/address/${id}/`, params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/api/address/', params)
}
// 删除收货地址
export const addressDel = (id) => {
  return http.fetchDelete(`/api/address/${id}/`)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/api/orders/', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/api/orders/', params)
}
// 获取单个订单详情
export const getOrderDet = (id) => {
  return http.fetchGet(`/api/orders/${id}/`)
}
// 更改订单
export const updateOrder = (id, params) => {
  return http.fetchUpdate(`/api/orders/${id}/`, params)
}
// 删除订单
export const delOrder = (id) => {
  return http.fetchDelete(`/api/orders/${id}/`)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/api/member/payOrder', params)
}

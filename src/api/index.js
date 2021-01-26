import http from './public'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/api/login/', params)
}
// 刷新 JWT
export const refresh = (params) => {
  return http.fetchPost('/api/refresh/', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/api/user/', params)
}
// // 上传图片
// export const upload = (params) => {
//   return http.fetchPost('/api/imgaeUpload', params)
// }
// 修改头像
export const updateuser = (id, params) => {
  return http.fetchUpdate(`/api/user/${id}/`, params)
}
// 首页接口
export const productHome = () => {
  return http.fetchGet('/api/home/')
}

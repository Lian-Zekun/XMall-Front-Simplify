import axios from 'axios'
import store from '../store/index.js'
import { getStore } from '../utils/storage.js'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.login) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      let token = getStore('token')
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data.data)
      }).catch(error => {
        reject(error.response.data.data)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data.data)
      }).catch(error => {
        reject(error.response.data.data)
      })
    })
  },
  fetchDelete (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(res => {
        resolve(res.data.data)
      }).catch(error => {
        reject(error.response.data.data)
      })
    })
  },
  fetchUpdate (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.patch(url, params).then(res => {
        resolve(res.data.data)
      }).catch(error => {
        reject(error.response.data.data)
      })
    })
  }
}

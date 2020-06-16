// import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'

import { getToken } from '@/lib/util'

// const baseUrl = Vue.prototype.baseConfig.apiUrl
const baseUrl = 'https://www.liulongbin.top:8888/api/private/v1'

class HttpRequest {
  interceptors(instance) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        config.baseURL = baseUrl
        const token = getToken()
        if (token) {
          config.headers['awmsToken'] = token
        }
        if (config.method === 'post') {
          config.data = {
            ...config.data,
            _t: Date.parse(new Date()) / 1000
          }
        } else if (config.method === 'get') {
          config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
          }
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        const { data, code } = res
        if (code == 0) {
          MessageBox.confirm('您访问的请求不存在', '提示', {
            type: 'warning'
          })
          return Promise.reject(new Error(res.message || 'Error'))
        } else {
          return { data, code }
        }
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    const instance = axios.create()
    this.interceptors(instance)
    return instance(options)
  }
}

const request = new HttpRequest()
export default request

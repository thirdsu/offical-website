// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import { Message } from 'element-ui'

var service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 20000
})

service.interceptors.request.use(request => {
  const token = localStorage.getItem('token')
  if (token) {
    request.headers['Access-Token'] = token
  }
  return request
})

// response拦截器
service.interceptors.response.use(response => {
  console.log(response.data)
  if (response.data.code === '0') {
    return response.data
  }
  if (response.data.code === '1') {
    Message.error(response.data.message)
  }
}, error => {
  return Promise.reject(error)
})

export default service

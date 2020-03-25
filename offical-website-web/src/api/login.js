import service from '../utils/request'

// 注册
export function register (data) {
  return service({
    url: '/register',
    method: 'post',
    data
  })
}

// 登录
export function login (data) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

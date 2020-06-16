import axios from '@/lib/request'

export const login = loginForm => {
  return axios.request({
    url: '/login',
    data: loginForm,
    method: 'post'
  })
}

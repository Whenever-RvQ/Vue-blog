import axios from 'axios'
import store from 'store'
import base from '@/config/base.config'

const { BASE_URL, TIMEOUT, TOKEN_NAME } = base
const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

//request 拦截器
service.interceptors.request.use(async (config) => {
  let token = store.get(TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error);
});

service.interceptors.response.use((response) => {
  //剥离最外层
  let result = response.data
  return result?.data;
}, (error) => {
  return Promise.reject(error);
});

export default service



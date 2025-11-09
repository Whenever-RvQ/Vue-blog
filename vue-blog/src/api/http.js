import service from './common'
import store from 'store'
import API_LIST from '@/config/api.config'
import base from '@/config/base.config'
import encrypt from '@/util/encrypt'

const { TOKEN_NAME } = base

export default async function Http({ type, data, params }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  
  let { url, method, noMessage = false, rsaKey = false, rest = false, setToken = false } = API_LIST[type]
  
  try {
    method = method.toLowerCase()
    
    // 处理 REST 风格的参数替换 (原有的 rest 处理逻辑)
    if (rest) {
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol])
    }
    // 新增：处理通用的参数替换 (用于 putUserInfo 等情况)
    else if (params && typeof params === 'object') {
      // 遍历 params 对象，替换 URL 中的所有占位符
      Object.keys(params).forEach(key => {
        const placeholder = ':' + key
        if (url.includes(placeholder)) {
          url = url.replace(placeholder, params[key])
        }
      })
    }
    
    if (rsaKey && data && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    
    // 根据请求方法处理数据
    data = method === 'get' ? { params: data } : data

    let result = await service[method](url, data)

    if (setToken && result) {
      let token = result.token;
      let uid = result.userId
      store.set('uid', uid)
      //本地存储token
      store.set(TOKEN_NAME, token)
      // 确保 this 存在再调用
      if (this && this.$store) {
        this.$store.dispatch('login')
      }
    }
    
    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      if (!noMessage) {
        //http函数作为插件挂载到了 Vue的prototype上 this指向vue实例
        if (this && this.$notify) {
          this.$notify.error({
            title: '错误',
            message
          })
        }
      }
    }
    return Promise.reject(error);
  } 
}
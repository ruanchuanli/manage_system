import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/'
})

request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 判断是否存在token，如果存在将每个页面header都添加token
    config.headers.Authorization = store.state.token
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器,参数为两个函数
request.interceptors.response.use(response => {
  // 因为后台返回的数据中都包含以下字段，将其解构，方便使用
  const { data, meta } = response.data
  console.log(meta)
  if (meta.status === 200 || meta.status === 201) {
    return data
  } else {
    Message.error(meta.msg || '操作失败')
    return Promise.reject(new Error(meta.msg)) // 手动制造错误，让其进入catch中
  }
}, error => {
  return Promise.reject(error) // 跳出当前执行链，直接进入catch
})
export default request

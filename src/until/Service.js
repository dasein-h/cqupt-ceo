import axios from 'axios'
const Service = axios.create({
  /*没有被覆盖*/
  // baseURL: 'http://172.22.4.2:8080',
  baseURL: 'http://39.100.140.143:8080',
  // baseURL: 'http://localhost:3000/api',
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 30000,
  transformRequest: [data => {
    data = JSON.stringify(data)
    return data
  }],

  validateStatus() {

    return true
  },
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})

Service.interceptors.request.use(config => {
  let tk
  if (tk = sessionStorage.getItem('tk')) {
    config.headers['token'] = tk
  }

  return config
}, error => {
  error.data = {}
  error.data.msg = '服务器异常请联系管理员!'
  return Promise.resolve(error)
})

Service.interceptors.response.use(response => {
  const status = response.status
  let message = ''
  if (status < 200 || status >= 300) {
    if (typeof response.data === 'string') {
      response.data = { message }
    } else {
      response.data.message = message
    }
    throw response.data
  }

  if (
    response?.data.message === '没有登录，请先登录' ||
    response?.data.message === '资源访问受限!请重新登录！'
  ) {
    sessionStorage.clear()
    window.location.replace('/')
  }

  return response
}, error => {
  error.data = {}
  error.data.msg = '请求超时或服务器异常,请检查网络或联系管理员!'
  return Promise.resolve(error)
})

export default Service

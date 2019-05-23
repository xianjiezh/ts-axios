
import axios from '../../src/index'
// axios.interceptors.request.use(config => {
//   config.headers.test += '2'
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += '3'
//   return config
// })

// axios.interceptors.response.use(res => {
//   res.data += '1'
//   return res
// })
// let interceptor = axios.interceptors.response.use(res => {
//   res.data += '2'
//   return res
// })
// axios.interceptors.response.use(res => {
//   res.data += '3'
//   return res
// })

// axios.interceptors.response.eject(interceptor)



axios.get('/interceptor/get2', {
  headers: {
    test: '222',
  },
  params: {
    a: 1
  }
}).then((res) => {
  console.log(res)
})
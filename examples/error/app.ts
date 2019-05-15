import axios, {AxiosError} from '../../src/index'

axios({
  method: 'get',
  url: '/error/get',
  timeout: 2000
}).then((res) => {
  console.log('res', res)
}).catch((e: AxiosError) => {
  console.log('error', e.message)
  console.log('error', e.code)
  console.log(e.response)
})
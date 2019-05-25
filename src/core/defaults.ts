import { AxiosRequestConfig } from '../types'

const defalts: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defalts.headers![method] = {}
})

const methodWithData = ['post', 'put', 'patch']

methodWithData.forEach(method => {
  defalts.headers![method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defalts

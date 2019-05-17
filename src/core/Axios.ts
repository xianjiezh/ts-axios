import { AxiosRequestConfig, AxiosPromise, Method} from '../types'

import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestMethodWithData('get', url, config)
  }
  private requestMethodWithOutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
      })
    )
  }

  private requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data,
      })
    )
  }

}
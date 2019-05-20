import { AxiosRequestConfig, AxiosPromise, AxiosInstance } from './types'
import xhr from './core/xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transfromHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transfromHeaders(config: AxiosRequestConfig) {
  const {
    headers = {},
    data 
  } = config
  return processHeaders(headers, data)
}

function createAxiosInstance(): any {
  const context = new Axios() 
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

export default createAxiosInstance()
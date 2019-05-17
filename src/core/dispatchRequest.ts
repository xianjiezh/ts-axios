
import { AxiosPromise, AxiosRequestConfig, AxiosResponse} from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  return buildURL(config.url!, config.params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  return processHeaders(config.headers = {}, config.data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transformResponse(response.data)
  return response
}

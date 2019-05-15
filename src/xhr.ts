import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseHeaders } from './helpers/parseResponseHeader'
import { transformResponse } from './helpers/data'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout
    } = config
    
    const r = new XMLHttpRequest()
    if (timeout) {
      r.timeout = timeout
    }
    r.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(h => {
      // 如果没有传入数据, 则不用设置content-type
      if (!data && h.toLowerCase() === 'content-type') {
        delete headers[h]
      } else {
        r.setRequestHeader(h, headers[h])
      }
    })
    
    r.onreadystatechange = function() {
      if (r.readyState === 4) {
        const responseHeaders = r.getAllResponseHeaders()
        let responseData
        if (responseType === 'text') {
          responseData = r.responseText
        } else {
          responseData = r.response
        }
        const response: AxiosResponse = {
          data: transformResponse(responseData),
          status: r.status,
          statusText: r.statusText,
          headers: parseHeaders(responseHeaders),
          config,
          request: r,
        }
        handleResponse(response)
      }
    }
    r.send(data)
    r.onerror = function() {
      reject(createError(
        'Network Error',
        config,
        null,
        r
      ))
    }
    r.ontimeout = function() {
      // reject(new Error(`Timeout of ${timeout} ms excceded`))
      reject(createError(
        `Timeout of ${config.timeout} ms exceeded`,
        config,
        'ECONNABORTED',
        r
      ))
    }
    function handleResponse(response: AxiosResponse): void {
      if (response.status  >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(response)
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          r,
          response
        ))
      }
    }
  })
  
}

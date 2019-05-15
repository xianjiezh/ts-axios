import { isJSONObject, isJSONArray } from './util'


function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return 
  }
  Object.keys(headers).forEach(name => {
    // 统一 header 中的大小写问题
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}



export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isJSONObject(data) || isJSONArray(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
  }
  return headers
}
import { isDate, isJSONObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

function buildSerializedParam(params: any): string {
  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value === null || value === undefined) {
      return 
    }
    let values: string[]
    // case Array
    if (Array.isArray(value)) {
      values = value
      key += '[]'
    } else {
      values = [value]
    }
    values.forEach(v => {
      if (isDate(value)) {
        v = value.toISOString(v)
      } else if (isJSONObject(v)) {
        v = JSON.stringify(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })
  })
  let serializedParam = parts.join('&')
  return serializedParam
}

export function buildURL(url: string, params: any) {
  if (!params) {
    return url
  }
  const serializedParam = buildSerializedParam(params)
  if (serializedParam) {
    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    } 
    if (url.includes('?')) {
      url += '&' + serializedParam
    } else {
      url += '?' + serializedParam
    }
  }
  return url
}


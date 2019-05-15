
export function isJSONObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isJSONArray(value: any) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export function isDate(value: any) {
  return Object.prototype.toString.call(value) === '[object Date]'
}





















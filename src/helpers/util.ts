
export function isJSONObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isJSONArray(value: any) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export function isDate(value: any) {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}


















export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: { [key: string]: any }
  headers?: { [key: string]: any }
  responseType?: XMLHttpRequestResponseType
  timeout?: number 
}

export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'


export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig 
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {
  
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  
}
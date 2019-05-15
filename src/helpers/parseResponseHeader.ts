export function parseHeaders(headers: string): any {
  const headerArr = headers.split('\r\n')
  let obj: { [key: string]: any } = {}
  headerArr.forEach((header, index) => {
    const [key, value] = header.split(': ')
    if (key && value) {
      obj[key] = value
    }
  })
  return obj
}
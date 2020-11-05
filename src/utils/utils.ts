import { NumberObj } from 'types'

// 是否是空对象
export function isEmptyObj(obj: object): boolean {
  return !Object.keys(obj).length
}

// 对象是否一样
export function isEqual(a: NumberObj, b: NumberObj) {
  for (let key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

const ralphaStart = /^[a-z]/
const rautoPx = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/

export function isAutoPx(prop: string) {
  const p = prop.replace(/-(\w)/g, function ($, $1) {
    return $1.toUpperCase()
  })
  return ralphaStart.test(p) && rautoPx.test(p[0].toUpperCase() + p.slice(1))
}
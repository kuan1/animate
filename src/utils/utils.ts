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
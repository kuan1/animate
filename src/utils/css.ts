import { isAutoPx } from "./utils"

// 获取样式
function getStyle(elem: HTMLElement) {
  var view = elem.ownerDocument.defaultView

  if (!view) {
    view = window
  }
  return view.getComputedStyle(elem)
}

// 获取样式属性
function getItemCss(elem: HTMLElement, name: string) {
  return getStyle(elem).getPropertyValue(name)
}

// 设置css
function setCss(elem: HTMLElement, css: Record<string, string | number>) {
  const { style } = elem
  Object.keys(css).forEach((prop) => {
    const value = `${(css as any)[prop]}${isAutoPx(prop) ? 'px' : ''}`
    if (elem.nodeType === 1 && (style || {})[prop as any] != null) {
      const isCustomProp = /^--/.test(prop)
      if (isCustomProp) {
        style.setProperty(prop, value)
      } else {
        style[prop as any] = value
      }
    } else {
      return (elem as any)[prop] = value
    }
  })
}

// 获取和设置css工具类
export default function css(elem: HTMLElement, options: string | Record<string, string | number>, value?: undefined | number | string) {
  if (typeof options === 'string') {
    const prop = options
    if (value) {
      setCss(elem, { [prop]: value })
    } else {
      return getItemCss(elem, prop)
    }
  } else {
    setCss(elem, options)
  }
}

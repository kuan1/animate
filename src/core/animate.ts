import { NumberObj, EasingFn } from 'types'
import noop from '../utils/noop'
import css from '../utils/css'
import tween, { Tween } from './tween'

class Animate {
  private tween: Tween<NumberObj> | undefined
  constructor(
    private elem: HTMLElement,
    private end: NumberObj,
    private duration: number | undefined,
    private easing: EasingFn | undefined,
    private callback: ((end: NumberObj) => void) = noop,
  ) {
    this.animate()
  }
  static animate(
    elem: HTMLElement,
    end: NumberObj,
    duration: number | undefined,
    easing: EasingFn | undefined,
    callback: ((end: NumberObj) => void) = noop,
  ) {
    return new Animate(elem, end, duration, easing, callback)
  }
  animate() {
    const progress = (now: NumberObj) => {
      css(this.elem, now)
    }
    const complete = () => {
      progress(this.end)
      typeof this.callback === 'function' && this.callback(this.end)
    }
    if (!this.tween) {
      this.tween = tween(this.cur(), this.end, complete, progress, this.duration, this.easing)
    } else {
      this.tween.doStart()
    }
    return this
  }
  stop() {
    this.tween?.doStop()
    return this
  }
  cur() {
    const start: NumberObj = {}
    const { elem } = this
    Object.keys(this.end).forEach(prop => {
      if (elem.nodeType !== 1 || ((elem as any)[prop] != null && elem.style[prop as any] == null)) {
        return start[prop] = (elem as any)[prop]
      }
      const value = css(elem, prop) || '0'
      start[prop] = parseInt(value)
    })
    return start
  }
}

export default Animate.animate
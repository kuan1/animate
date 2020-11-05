import { NumberObj, EasingFn } from 'types'
import easings from '../utils/easings'
import noop from '../utils/noop'
import { isEqual } from '../utils/utils'


let fxNow: number | undefined
function createFxNow() {
  window.setTimeout(function () {
    fxNow = undefined
  })
  return (fxNow = Date.now())
}

export class Tween<T extends NumberObj> {
  private now: T // 当前数据
  private startTime: number // 开始时间
  private currentTime: number // 当前时间
  private duration: number = 300 // 持续时间
  private inProgress: boolean // 任务是否在进行中
  private easing: EasingFn

  constructor(
    private start: T,
    private end: T,
    private complete: ((end: T) => void) = noop,
    private progress: ((end: T) => void) = noop,
    duration: number | undefined,
    easing: EasingFn | undefined
  ) {
    this.now = this.start
    this.end = end
    this.startTime = this.currentTime = Date.now()
    duration && (this.duration = duration)
    this.easing = this.getEasingFn(easing)
    this.inProgress = false
    this.run = this.run.bind(this)
    this.schedule = this.schedule.bind(this)
    this.doStart()
  }

  static init(
    start: NumberObj,
    end: NumberObj,
    complete: ((end: NumberObj) => void) = noop,
    progress: ((end: NumberObj) => void) = noop,
    duration: number | undefined,
    easing: EasingFn | undefined
  ): Tween<NumberObj> {
    return new Tween(start, end, complete, progress, duration, easing)
  }

  doStart() {
    if (this.inProgress) return
    this.inProgress = true
    this.schedule()
  }
  doStop() {
    if (!this.inProgress) return
    this.now = this.end
    this.progress(this.now)
    this.complete(this.end)
    this.inProgress = false
  }
  schedule() {
    if (this.inProgress && !isEqual(this.end, this.now)) {
      if (document.visibilityState === 'hidden' && window.requestAnimationFrame) {
        window.requestAnimationFrame(this.schedule)
      } else {
        window.setTimeout(this.schedule, 16.7)
      }
      this.run()
    }
  }
  run() {
    if (!this.inProgress) return
    this.currentTime = fxNow || createFxNow()
    const remain = Math.max(0, this.startTime + this.duration - this.currentTime)
    if (!remain) {
      return this.doStop()
    }
    const percent = 1 - remain / this.duration
    this.now = this.getNow(percent)
    this.progress(this.now)
  }
  getNow(percent: number) {
    const now: NumberObj = {}
    Object.keys(this.start).forEach((key) => {
      now[key] = this.easing(percent, this.start[key], this.end[key])
    })
    return now as T
  }
  getEasingFn(easing: EasingFn | undefined): EasingFn {
    if (typeof easing === 'function') {
      return easing
    }
    const key = easing || 'ease'
    return (easings as any)[key]
  }
}

export default Tween.init

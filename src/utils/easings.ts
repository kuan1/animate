const easing = {
  // 匀速
  linear(percent: number, start: number, end: number) {
    return start + Math.floor((end - start) * percent)
  },
  // 先慢再快后慢
  ease(percent: number = 0, start: number = 0, end: number = 1): number {
    return start + Math.floor((end - start) * (-Math.cos(percent * Math.PI) / 2 + 0.5))
  },
  _default: 'ease',
}

export default easing


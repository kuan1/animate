import { NumberObj, EasingFn } from 'types'
import animate from './animate'
import noop from '../utils/noop'

/**
 * 点击自动居中tabs
 * @param container 有定位属性的容器 
 * @param items 单个元素
 * @param duration 动画时间
 * @param easing 轨迹
 * @param callback 动画完成回调
 */
function initTabs(
  container: HTMLElement,
  items: HTMLElement[],
  active: string | undefined,
  duration: number | undefined,
  easing: EasingFn | undefined,
  callback: ((end: NumberObj) => void) = noop,
) {
  const list = [...items]
  list.forEach(item => {
    item.addEventListener('click', () => {
      const halfClientWidth = container.clientWidth / 2;
      const itemLeft = item.offsetLeft;
      const halfItemWidth = item.clientWidth / 2;
      const scrollDest = itemLeft - halfClientWidth + halfItemWidth;
      animate(container, { scrollLeft: scrollDest }, duration, easing, callback);
      if (active) {
        list.forEach(it => {
          it.classList.remove(active)
        })
        item.classList.add(active)
      }
    })
  })
}

export default initTabs
import { easeInOutCubic, EasingFunction } from './easing';

const requestAnimationFrameFun = (typeof window === 'undefined' ? false : window.requestAnimationFrame) || ((cb) => setTimeout(cb, 16.6));

interface ScrollToOptions {
    container?: any;
    duration?: number;
    easing?: EasingFunction;
}

/**
 * 获取滚动距离
 *
 * @export
 * @param {ScrollTarget} target
 * @param {boolean} isLeft true为获取scrollLeft, false为获取scrollTop
 * @returns {number}
 */
export function getScroll(target: any, isLeft?: boolean): number {
  const method = isLeft ? 'scrollLeft' : 'scrollTop';
  let result = 0;
  if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = (target as HTMLElement)[method];
  }
  return result;
}

export function scrollTo(target: number, options: ScrollToOptions) {
  const { container, duration = 200, easing = easeInOutCubic } = options;
  const scrollTop = getScroll(container);
  const startTime = Date.now();
  return new Promise((res) => {
    const fnc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      const nextScrollTop = easing(Math.min(time, duration), scrollTop, target, duration);
      if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
        (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
      } else {
        (container as HTMLElement).scrollTop = nextScrollTop;
      }
      if (time < duration) {
        requestAnimationFrameFun(fnc);
      } else {
        // 由于上面步骤设置了scrollTop, 滚动事件可能未触发完毕
        // 此时应该在下一帧再执行res
        requestAnimationFrameFun(res);
      }
    };
    requestAnimationFrameFun(fnc);
  });
}

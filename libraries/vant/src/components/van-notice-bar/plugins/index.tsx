import _ from 'lodash';
import { ref } from 'vue';
import { getPropsIcon } from '@/plugins/common/icon';
import { useEffect } from '@/plugins/hooks';
import { $ide } from '@/plugins/constants';

export const useNoticeBarIcon = (props: any) => {
  const leftIcon = props.get('leftIcon');
  const rightIcon = props.get('rightIcon');
  const slots = props.get('slots');

  return {
    slots: _.assign(slots, {
      ...slots,
      'left-icon': leftIcon ? () => getPropsIcon({ name: leftIcon }) : null,
      'right-icon': rightIcon ? () => getPropsIcon({ name: rightIcon }) : null,
    }),
  };
};

// ide里禁用动画，需要重新计算动画，并覆盖ide里的样式
export function handleTransition(props) {
  const speed = props.get('speed') || 60;
  const scrollable = props.get('scrollable');
  const nodePath = props.get('data-nodepath');

  const isDesigner = props.get('isDesigner');
  if (!isDesigner) return;

  const noticeBarContent = ref<HTMLElement | null>(null);

  useEffect(() => {
    noticeBarContent.value = document.querySelector(`[data-nodepath="${nodePath}"] .van-notice-bar__content`) as HTMLElement;
  }, [nodePath]);

  useEffect(() => {
    if (!noticeBarContent.value) return;

    // 获取容器元素
    const container = noticeBarContent.value.parentElement;
    if (!container) return;

    const styleId = `van-notice-bar-override-styles-${nodePath}`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    // 如果 scrollable 为 false，清理样式和重置位置
    if (!scrollable) {
      // 移除样式元素
      if (styleElement) {
        styleElement.remove();
      }
      // 重置元素位置和样式
      noticeBarContent.value.style.transition = '';
      noticeBarContent.value.style.transform = '';
      return;
    }

    // 创建样式覆盖
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const containerWidth = container.offsetWidth;
    const contentWidth = noticeBarContent.value.offsetWidth;

    const initialTransitionDuration = `${contentWidth / speed}s`;
    // 更新样式
    styleElement.textContent = `
      .van-notice-bar__content {
        transition-duration: ${initialTransitionDuration} !important;
      }
    `;

    // 滚动结束处理
    const handleTransitionEnd = () => {
      if (noticeBarContent.value) {
        // 先移除过渡效果，立即重置位置到右侧
        noticeBarContent.value.style.transition = 'none';
        noticeBarContent.value.style.transform = `translateX(${containerWidth}px)`;

        // 重排
        noticeBarContent.value.offsetHeight;

        // 延迟一帧后重新添加过渡效果并开始滚动
        requestAnimationFrame(() => {
          if (noticeBarContent.value) {
            const nextTransitionDuration = `${(containerWidth + contentWidth) / speed}s`;
            noticeBarContent.value.style.transform = `translateX(-${contentWidth}px)`;
            noticeBarContent.value.style.transition = `transform ${nextTransitionDuration} linear`;
            styleElement.textContent = `
              .van-notice-bar__content {
                transition-duration: ${nextTransitionDuration} !important;
              }
            `;
          }
        });
      }
    };

    // 移除之前的事件监听器（如果存在）
    noticeBarContent.value.removeEventListener('transitionend', handleTransitionEnd);
    noticeBarContent.value.addEventListener('transitionend', handleTransitionEnd);
  }, [noticeBarContent, speed, nodePath, scrollable]);
}

handleTransition.type = $ide;

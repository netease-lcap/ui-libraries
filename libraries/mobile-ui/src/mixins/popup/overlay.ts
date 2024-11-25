import cls from 'classnames';
import Overlay from '../../overlay';
import { context } from './context';
import { mount } from '../../utils/functional';
import { removeNode } from '../../utils/dom/node';

export type OverlayConfig = {
  zIndex?: number;
  className?: string;
  customStyle?: string | object[] | object;
};

const defaultConfig: OverlayConfig = {
  className: '',
  customStyle: {},
};

function mountOverlay(vm: any) {
  return mount(Overlay, {
    on: {
      // close popup when overlay clicked & closeOnClickOverlay is true
      click() {
        vm.$emit('click-overlay');

        if (vm.closeOnClickOverlay) {
          if (vm.onClickOverlay) {
            vm.onClickOverlay();
          } else {
            vm.close();
          }
        }
      },
    },
  });
}

export function updateOverlay(vm: any): void {
  const item = context.find(vm);

  if (item) {
    const el = vm.$el;
    const { config, overlay } = item;

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
      /**
       * 更新overlay上的css-rules className
       */
      const clx = cls(vm.$vnode?.data?.class || [], vm.$vnode?.data?.staticClass || '');
      // 1、查找el上的class属性，以css-rule开头
      const cssRuleClassName = clx.split(' ')?.find((className) => /^cw-css-rule-?/.test(className));
      // 2、如果有，添加到overlay上
      if (cssRuleClassName && !overlay.$el.classList.contains(cssRuleClassName)) {
        overlay.$el.classList.add(cssRuleClassName);
      }
    }

    Object.assign(overlay, defaultConfig, config, {
      show: true,
    });
  }
}

export function openOverlay(vm: any, config: OverlayConfig): void {
  const item = context.find(vm);
  if (item) {
    item.config = config;
  } else {
    const overlay = mountOverlay(vm);
    context.stack.push({ vm, config, overlay });
  }

  updateOverlay(vm);
}

export function closeOverlay(vm: any): void {
  const item = context.find(vm);
  if (item) {
    item.overlay.show = false;
  }
}

export function removeOverlay(vm: any) {
  const item = context.find(vm);
  if (item) {
    removeNode(item.overlay.$el);
    context.remove(vm);
  }
}

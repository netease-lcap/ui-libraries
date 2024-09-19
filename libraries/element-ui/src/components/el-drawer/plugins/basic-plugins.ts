/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { $ref } from '@lcap/vue2-utils/plugins/index';
import _, { camelCase } from 'lodash';
import { useUpdateSync } from '@lcap/vue2-utils';

import type { MapGet } from '@lcap/vue2-utils/plugins/types';
import { getCurrentInstance, onMounted, onUpdated } from '@vue/composition-api';

const useSetDialogStyles = (props: MapGet) => {
  const instance = getCurrentInstance();
  const setStyles = () => {
    const drawerStyle = props.get('drawerStyle');
    if (
      !drawerStyle
      || !instance
      || !instance.refs.$base
      || !(instance.refs.$base as any).$el
    ) {
      return;
    }

    const dialogEl = (instance.refs.$base as any).$el.querySelector(
      '.el-drawer',
    ) as HTMLDivElement;
    if (!dialogEl) {
      return;
    }

    Object.keys(drawerStyle).forEach((key) => {
      dialogEl.style[camelCase(key)] = drawerStyle[key];
    });
  };

  onMounted(setStyles);
  onUpdated(setStyles);
};

export const useDialog: NaslComponentPluginOptions = {
  setup: (props) => {
    // 同时响应外部  visible属性设置的变化
    const { visible: opened, ...reset } = useUpdateSync(props, [
      { name: 'visible', event: 'update:visible' },
    ]);

    useSetDialogStyles(props);
    return {
      visible: opened,
      ...reset,
      [$ref]: {
        // 外部可以读取 visible
        props: ['visible'],
        // ide 内使用
        designerControl() {
          opened.value = !opened;
        },
        open: () => {
          opened.value = true;
        },
        close: () => {
          opened.value = false;
        },
      },
    };
  },
};

export const useEvents = {
  setup: (props) => {
    return {
      beforeClose: (done) => {
        const onBeforeClose = props.get('onBeforeClose');
        if (_.isFunction(onBeforeClose)) {
          _.attempt(onBeforeClose, done);
        }
        done();
      },
    };
  },
  order: 8,
};

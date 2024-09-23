/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { $ref } from '@lcap/vue2-utils/plugins/index';
import _, { camelCase } from 'lodash';
import { useUpdateSync } from '@lcap/vue2-utils';
import type { MapGet } from '@lcap/vue2-utils/plugins/types';
import '../index.less';
import { getCurrentInstance, onMounted, onUpdated } from '@vue/composition-api';

const useSetDialogStyles = (props: MapGet) => {
  const instance = getCurrentInstance();
  const setStyles = () => {
    const dialogStyle = props.get('dialogStyle');
    if (!dialogStyle || !instance || !instance.refs.$base || !(instance.refs.$base as any).$el) {
      return;
    }

    const dialogEl = (instance.refs.$base as any).$el.querySelector('.el-dialog') as HTMLDivElement;
    if (!dialogEl) {
      return;
    }

    Object.keys(dialogStyle).forEach((key) => {
      dialogEl.style[camelCase(key)] = dialogStyle[key];
    });
  };

  onMounted(setStyles);
  onUpdated(setStyles);
};

export const useDialog: NaslComponentPluginOptions = {
  setup: (props) => {
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

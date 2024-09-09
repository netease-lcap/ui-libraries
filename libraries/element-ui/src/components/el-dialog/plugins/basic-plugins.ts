/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { $ref } from '@lcap/vue2-utils/plugins/index';
import _ from 'lodash';
import { useUpdateSync } from '@lcap/vue2-utils';
import '../index.less';

export const useDialog: NaslComponentPluginOptions = {
  setup: (props) => {
    const { visible: opened, ...reset } = useUpdateSync(props, [
      { name: 'visible', event: 'update:visible' },
    ]);

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

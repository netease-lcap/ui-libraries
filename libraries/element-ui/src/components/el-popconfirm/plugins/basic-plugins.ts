import type { MapGet } from '@lcap/vue2-utils/plugins/types';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import _, { camelCase } from 'lodash';
import { getCurrentInstance, onMounted, onUpdated } from '@vue/composition-api';

export const useSetDialogStyles = (props: MapGet) => {
  const instance = getCurrentInstance();
  const setStyles = () => {
    const dialogStyle = props.get('dialogStyle');
    if (
      !dialogStyle
      || !instance
      || !instance.refs.$base
      || !(instance.refs.$base as any).$el
    ) {
      return;
    }

    const dialogEl = (instance.refs.$base as any).$el.querySelector(
      '.el-popconfirm',
    ) as HTMLDivElement;
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

export const usePopconfirm: NaslComponentPluginOptions = {
  setup: (props) => {
    useSetDialogStyles(props);
  },
};

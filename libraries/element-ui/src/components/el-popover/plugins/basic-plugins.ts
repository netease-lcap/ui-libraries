import { onBeforeUnmount } from '@vue/composition-api';

export const useTrigger = {
  setup(props, ctx) {
    const trigger = props.useRef('trigger', (v) => v || 'hover');
    const visible = props.useRef('visible', (v) => v || false);
    onBeforeUnmount(() => {
      trigger.value = 'manual';
      visible.value = false;
    });
    return {
      trigger,
      visible,
    };
  },
};

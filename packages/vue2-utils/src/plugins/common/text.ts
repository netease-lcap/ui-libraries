import { getCurrentInstance, useSlots } from '@vue/composition-api';
import type { NaslComponentPluginOptions } from '../types';
import { isEmptyVNodes } from '../utils';

export const createProp2Default = (propName: string) => {
  const useProps2Default: NaslComponentPluginOptions = {
    props: [propName],
    setup: (props) => {
      const ins = getCurrentInstance();

      const slotDefault = props.get<any>('slotDefault');
      return {
        slotDefault: () => {
          let defaultNode = slotDefault && slotDefault();

          if (!slotDefault) {
            defaultNode = typeof ins.slots.default === 'function' ? ins.slots.default() : ins.slots.default;
          }

          if (isEmptyVNodes(defaultNode)) {
            return props.get(propName) || null;
          }

          return defaultNode;
        },
      };
    },
    order: 1,
  };

  return useProps2Default;
};

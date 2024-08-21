import type { NaslComponentPluginOptions } from '../plugin';
import { isEmptyVNodes } from '../utils';

export const createProp2Default = (propName: string) => {
  const useProps2Default: NaslComponentPluginOptions = {
    props: [propName],
    setup: (props) => {
      return {
        slotDefault: () => {
          const slotDefault = props.get<any>('slotDefault');
          const defaultNode = slotDefault && slotDefault();
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

import { isEmptyVNodes } from '../utils';

export const createProp2Default = (propName) => {
  const useProps2Default = {
    props: [propName],
    setup: (props) => {
      return {
        slotDefault: () => {
          const slotDefault = props.get('slotDefault');
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

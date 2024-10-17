import { NaslComponentPluginOptions } from '../types';
import { $ref } from '../constants';
import { isNullOrUndefined } from '../utils';

export const createUsePopup = (propName: string = 'visible') => {
  const usePopup: NaslComponentPluginOptions = {
    setup: (props) => {
      const opened = props.useRef(propName, (v) => (!isNullOrUndefined(v)));

      return {
        [propName]: opened,
        [$ref]: {
          props: [propName],
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

  return usePopup;
};

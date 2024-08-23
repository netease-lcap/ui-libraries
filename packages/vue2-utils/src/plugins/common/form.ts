import { NaslComponentPluginOptions, PluginSetupFunctionReturn } from '../types';
import { getEventKey } from '../utils';

interface PropSyncOption {
  name: string;
  event: string;
  defaultValue?: any;
}

export const createUseUpdateSync = (options: PropSyncOption[] = [{ name: 'value', event: 'change' }]) => {
  return {
    name: 'useUpdateSync',
    setup(props) {
      const returnMap: PluginSetupFunctionReturn = {};

      options.forEach(({ name, event, defaultValue }) => {
        const eventName = getEventKey(event);
        const propRef = props.useRef<any>(name, (v) => (typeof v === 'undefined' ? defaultValue : v));
        const onUpdateValue = props.get(`update:${name}`);
        const eventHandler = props.get(eventName);

        returnMap[name] = propRef;
        returnMap[eventName] = (...args: any[]) => {
          // eslint-disable-next-line prefer-destructuring
          propRef.value = args[0];
          if (typeof onUpdateValue === 'function') {
            onUpdateValue(args[0]);
          }

          if (typeof eventHandler === 'function') {
            eventHandler(...args);
          }
        };
      });

      return returnMap;
    },
  } as NaslComponentPluginOptions;
};

/**
 * v-model 兼容 update:sync
 */
export const useVModelSync: NaslComponentPluginOptions = createUseUpdateSync([{ name: 'value', event: 'input' }]);

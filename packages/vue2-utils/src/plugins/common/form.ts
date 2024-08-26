import { MapGet, NaslComponentPluginOptions, PluginSetupFunctionReturn } from '../types';
import { getEventKey } from '../utils';
import { useSyncState } from '../../hooks';

interface PropSyncOption {
  name: string;
  event: string;
  defaultValue?: any;
}

export const useUpdateSync = (props: Readonly<MapGet>, options: PropSyncOption[] = [{ name: 'value', event: 'change' }]) => {
  const returnMap: PluginSetupFunctionReturn = {};
  const syncMap: Record<string, () => any> = {};

  options.forEach(({ name, event, defaultValue }) => {
    const eventName = getEventKey(event);
    const propRef = props.useRef(name, (v) => (typeof v === 'undefined' ? defaultValue : v));
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

    syncMap[name] = () => propRef.value;
  });

  useSyncState(syncMap);

  return returnMap;
};

export const createUseUpdateSync = (options: PropSyncOption[] = [{ name: 'value', event: 'change' }]) => {
  return {
    name: 'useUpdateSync',
    setup(props) {
      return useUpdateSync(props, options);
    },
    order: 10,
  } as NaslComponentPluginOptions;
};

/**
 * v-model 兼容 update:sync
 */
export const useVModelSync: NaslComponentPluginOptions = createUseUpdateSync([{ name: 'value', event: 'input' }]);

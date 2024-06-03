import type { ComponentOptions, WatchOptionsWithHandler } from 'vue';

export type SyncOption = string | { [name: string]: string | (() => any) };
export interface SyncOptionItem {
  name: string;
  stateKey: string;
  computed?: () => any;
}

function createWatch(name: string): WatchOptionsWithHandler<any> {
  return {
    handler(val, oldVal) {
      if (val === oldVal) {
        return;
      }

      this.$emit('sync:state', name, val);
    },
    immediate: true,
  };
}

function normalizeSyncOptions(options: SyncOption[]) {
  const syncMap: { [key: string]: SyncOptionItem } = {};
  const computedMap: { [key: string]: () => any } = {};
  const watchMap: Record<string, WatchOptionsWithHandler<any>> = {};

  options.forEach((option) => {
    if (typeof option === 'string') {
      syncMap[option] = {
        name: option,
        stateKey: option,
      };

      watchMap[option] = createWatch(option);
      return;
    }

    Object.keys(option).forEach((name) => {
      const val = option[name];

      if (typeof val === 'function') {
        const stateKey = [name, 'sync'].join('__');
        syncMap[name] = {
          name,
          stateKey,
        };

        watchMap[stateKey] = createWatch(name);
        computedMap[stateKey] = val;
        return;
      }

      syncMap[name] = {
        name,
        stateKey: val,
      };
      watchMap[val] = createWatch(name);
    });
  });

  return {
    syncMap,
    computedMap,
    watchMap,
  };
}

export default (...options: SyncOption[]) => {
  const {
    syncMap,
    watchMap,
    computedMap,
  } = normalizeSyncOptions(options);
  return {
    methods: {
      $emitSync(names: string[] = []) {
        names.forEach((name) => {
          if (!syncMap[name]) {
            return;
          }

          const { stateKey } = syncMap[name];
          this.$emit('sync:state', name, this[stateKey]);
        });
      },
      $emitSyncParams(params: { [key: string]: any }) {
        if (!params || typeof params !== 'object') {
          return;
        }

        const filterKeys = ['size', 'page', 'sort', 'order', 'filterText'];
        Object.keys(params).forEach((key) => filterKeys.includes(key) && this.$emit('sync:state', key, params[key]));
      },
    },
    watch: {
      ...watchMap,
    },
    computed: {
      ...computedMap,
    },
  } as ComponentOptions<any>;
};

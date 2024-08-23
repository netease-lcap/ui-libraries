import {
  computed,
  type ComputedRef,
  watch,
  getCurrentInstance,
  onBeforeMount,
} from '@vue/composition-api';

export function useSyncState(syncMap: Record<string, () => any> = {}) {
  const instance = getCurrentInstance();
  const syncComputedMap: Record<string, ComputedRef> = {};

  Object.keys(syncMap).forEach((name) => {
    syncComputedMap[name] = computed(syncMap[name]);
  });

  onBeforeMount(() => {
    Object.keys(syncMap).forEach((name) => {
      watch(syncComputedMap[name], (val, oldValue) => {
        if (val === oldValue) {
          return;
        }

        instance?.emit('sync:state', name, val);
      }, {
        immediate: true,
      });
    });
  });

  return syncComputedMap;
}

import Vue from 'vue';

export const FormActionType = {
  INIT_FIELD: 'INIT_FIELD',
  REMOVE_FIELD: 'REMOVE_FIELD',
};

export const useFormActionCollect = (callback) => {
  let collect: any = null;
  let actionMap: Record<string, any[]> = {};
  return () => {
    if (collect) {
      return collect as (action: string, ...keys: any[]) => void;
    }

    collect = (action: string, ...keys: any[]) => {
      if (!actionMap[action]) {
        actionMap[action] = [];
      }

      keys.filter((k) => !!k).forEach((k) => actionMap[action].push(k));
    };

    Vue.nextTick(() => {
      callback(actionMap);
      collect = null;
      actionMap = {};
    });

    return collect as (action: string, ...keys: any[]) => void;
  };
};

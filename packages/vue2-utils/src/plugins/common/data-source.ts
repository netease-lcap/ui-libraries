import { isPlainObject } from 'lodash';
import { onBeforeMount, getCurrentInstance } from '@vue/composition-api';
import { NaslComponentPluginOptions } from '../types';
import { $deletePropList, $ref } from '../constants';

export type LoadDataFunc = (params: { [key: string]: any }) => Promise<{ list: any[], total: number }>;

export const useDataSource: NaslComponentPluginOptions = {
  props: ['dataSource', 'dataSchema', 'data', 'total'],
  setup: (props, { setupContext: ctx }) => {
    const loading = props.useRef('loading');
    const instance = getCurrentInstance();

    const data = props.useRef<any[]>('dataSource', (v) => {
      if (Array.isArray(v)) {
        return v;
      }

      if (typeof v === 'object' && Array.isArray(v.list)) {
        return v.list;
      }

      return [];
    });

    const total = props.useRef<number>('dataSource', (v) => {
      if (Array.isArray(v)) {
        return v.length;
      }

      if (typeof v === 'object' && Array.isArray(v.list) && v.total) {
        return v.total;
      }

      return 0;
    });

    const loadDataFn = props.useRef('dataSource', (v) => {
      if (typeof v !== 'function') {
        return null;
      }

      const loadData = async (params: Record<string, any>) => {
        loading.value = true;

        if (params && isPlainObject(params)) {
          ['size', 'page', 'sort', 'order', 'filterText'].forEach((key) => {
            instance?.emit('sync:state', key, params[key]);
          });
        }

        const d = await Promise.resolve(v(params || {}));
        if (Array.isArray(d)) {
          data.value = d;
          total.value = d.length;
        } else if (typeof d === 'object' && Array.isArray(d.list)) {
          data.value = d.list;
          total.value = d.total || d.list.length;
        }

        loading.value = false;
        return data;
      };

      return loadData;
    });

    return {
      data,
      total,
      loading,
      onLoadData: loadDataFn,
      [$ref]: {
        reload(params = {}) {
          const loadData = props.getEnd<LoadDataFunc | null>('onLoadData');
          if (!loadData) {
            return;
          }

          // eslint-disable-next-line consistent-return
          return loadData(params);
        },
      },
      /* 删除多余的key 防止透传 */
      [$deletePropList]: ['onLoadData'],
    };
  },
  order: 1,
};

export const useInitialLoaded: NaslComponentPluginOptions = {
  props: ['initialLoaded'],
  setup: (props) => {
    onBeforeMount(() => {
      const [initialLoaded, loadData] = props.getEnd(['initialLoaded', 'onLoadData']);

      if (initialLoaded === false || typeof loadData !== 'function') {
        return;
      }

      loadData({});
    });
  },
  order: 8,
};

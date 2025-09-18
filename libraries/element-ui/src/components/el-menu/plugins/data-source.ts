import { $deletePropList, $ref, LoadDataFunc } from '@lcap/vue2-utils/plugins/index.js';
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/types';

export const useDataSource: NaslComponentPluginOptions = {
  props: ['dataSource', 'dataSchema', 'data', 'total', 'loading'],
  setup: (props, { setupContext: ctx }) => {
    const loading = props.useRef('loading');

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

      const loadData = async () => {
        loading.value = true;

        const d = await Promise.resolve(v({}));
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

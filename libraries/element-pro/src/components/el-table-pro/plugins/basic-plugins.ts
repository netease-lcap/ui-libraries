/* 组件功能扩展插件 */
// export {};
import _ from 'lodash';
import {
  computed, ref, watch, onMounted,
} from '@vue/composition-api';

import { $render, createUseUpdateSync } from '@lcap/vue2-utils';

export { useDataSource } from '@lcap/vue2-utils';
export const useUpdateSync = createUseUpdateSync([
  { name: 'selectedRowKeys', event: 'update:selectedRowKeys' },
]);

export const useTable = {
  props: ['onPageChange'],
  setup(props, ctx) {
    const current = props.useRef('current', 1);
    const sorting = props.useComputed('sorting', (value) => value);
    const renderSlot = (vnodes) => {
      return vnodes.flatMap((vnode) => {
        if (!vnode.tag?.includes('ElTableColumnPro')) return [];
        const attrs = _.get(vnode, 'data.attrs', {});
        const nodePath = _.get(attrs, 'data-nodepath');
        const { cell, title } = _.get(vnode, 'data.scopedSlots', {});
        const cellProps = _.isFunction(cell) && !attrs.type
          ? {
            cell: (h, { row, rowIndex, col }) => cell({ item: row, index: rowIndex, col }),
          }
          : {};
        const titleProps = _.isFunction(title)
          ? {
            title: (h, { row, rowIndex, col }) => title({ row, index: rowIndex, col }),
          }
          : {};
        return [
          {
            ...attrs,
            ...cellProps,
            ...titleProps,
            attrs: {
              'data-nodepath': nodePath,
            },
          },
        ];
      });
    };

    const onLoadData = props.get('onLoadData');
    const pageSize = props.useRef('pageSize');

    const onPageChange = props.useComputed('onPageChange', (value) => {
      return (pageInfo) => {
        pageSize.value = pageInfo.pageSize;
        current.value = pageInfo.current;
        _.attempt(onLoadData, {
          page: pageInfo.current,
          size: pageInfo.pageSize,
        });
        _.attempt(value, pageInfo);
      };
    });

    const pageSizeOptions = props.useComputed('pageSizeOptions', (value) => {
      try {
        const list = JSON.parse(value);
        return Array.isArray(list) ? list : [10, 20, 50];
      } catch (e) {
        return [10, 20, 50];
      }
    });

    // const pageSize = props.useComputed('pageSize', (value) => {
    //   return _.toNumber(value) || 10;
    // });

    const total = props.useComputed('total', (value) => value ?? 10);

    const defaultCurrent = props.useComputed(
      'defaultCurrent',
      (value) => value,
    );

    const pagination = computed(() => {
      return {
        pageSizeOptions: pageSizeOptions.value,
        showJumper: true,
        current,
        total: total.value,
        pageSize: pageSize.value,
      };
    });
    onMounted(() => {
      if (_.isFunction(onLoadData)) {
        onLoadData?.({
          page: current.value,
          size: pageSize.value,
          sort: sorting.value?.field,
          order: sorting.value?.order,
        });
      }
    });
    const onSortChange = props.useComputed('onSortChange', (value) => {
      return (...arg) => {
        _.attempt(onLoadData, {
          page: current.value,
          size: pageSize.value,
          sort: _.get(arg, '0.sortBy'),
          order: _.get(arg, '0.descending') ? 'desc' : 'asc',
        });
        _.attempt(value, ...arg);
      };
    });
    return {
      onPageChange,

      pagination,
      onSortChange,
      [$render](resultVNode, h) {
        const vnodes = ctx.setupContext.slots.default();
        resultVNode.componentOptions.propsData.columns = renderSlot(vnodes);
        return resultVNode;
      },
    };
  },
};

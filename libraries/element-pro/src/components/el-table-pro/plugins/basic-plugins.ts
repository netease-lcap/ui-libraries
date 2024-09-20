/* 组件功能扩展插件 */
// export {};
import _, { isFunction, isNil } from 'lodash';
import {
  computed, ref, watch, onMounted,
} from '@vue/composition-api';
import { SelectOptions } from '@element-pro';
import { $ref, $render, createUseUpdateSync } from '@lcap/vue2-utils';

export { useDataSource } from '@lcap/vue2-utils';
export const useUpdateSync = createUseUpdateSync([
  { name: 'selectedRowKeys', event: 'update:selectedRowKeys' },
]);

export const useTable = {
  props: ['onPageChange', 'page', 'pageSize'],
  setup(props, ctx) {
    const current = props.useRef('page', (v) => v ?? 1);
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
    const pageSize = props.useRef('pageSize', (v) => v ?? 10);

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

    const paginationProps = props.useComputed('pagination');
    const pagination = computed(() => {
      if (paginationProps.value === false) {
        return false;
      }
      return {
        pageSizeOptions: pageSizeOptions.value,
        showJumper: true,
        current: current.value,
        total: total.value,
        pageSize: pageSize.value,
      };
    });

    // 产品要求默认开边框
    const bordered = props.useComputed('bordered', (v) => (isNil(v) ? true : v));
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

    return {
      onPageChange,
      pagination,
      onSortChange,
      bordered,
      onSelectChange: (selectedRowKeys: Array<string | number>, context: SelectOptions<any>) => {
        const onSelectChange = props.get('onSelectChange');

        if (isFunction(onSelectChange)) {
          onSelectChange({
            selectedRowKeys,
            ...context,
          });
        }
      },
      [$ref]: {
        reload() {
          current.value = 1;
          if (_.isFunction(onLoadData)) {
            onLoadData?.({
              page: current.value,
              size: pageSize.value,
              sort: sorting.value?.field,
              order: sorting.value?.order,
            });
          }
        },
      },
      [$render](resultVNode) {
        const vnodes = ctx.setupContext.slots.default();
        resultVNode.componentOptions.propsData.columns = renderSlot(vnodes);
        return resultVNode;
      },
    };
  },
};

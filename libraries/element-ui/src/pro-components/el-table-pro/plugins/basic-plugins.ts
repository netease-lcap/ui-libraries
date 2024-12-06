/* eslint-disable no-shadow */
/* 组件功能扩展插件 */
// export {};
import _, { isFunction, isNil } from 'lodash';
import {
  computed, ref, watch, onMounted,
} from '@vue/composition-api';
import {
  SelectOptions, Table, BaseTable, PrimaryTable, EnhancedTable,
} from '@element-pro';
import { listToTree } from '@lcap/vue2-utils/utils';
import { $ref, $render, createUseUpdateSync } from '@lcap/vue2-utils';

import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';

export { useDataSource } from '@lcap/vue2-utils';
export const useUpdateSync = createUseUpdateSync([{ name: 'selectedRowKeys', event: 'update:selectedRowKeys' }]);

export const useTable: NaslComponentPluginOptions = {
  props: ['onPageChange', 'page', 'pageSize', 'pageSizeOptions', 'showTotal', 'showJumper', 'treeDisplay', 'virtual'],
  setup(props, ctx) {
    const current = props.useRef('page', (v) => v ?? 1);
    const pageSize = props.useRef('pageSize', (v) => v ?? 10);
    const rowKey = (props.get('rowKey') || 'id') as string;
    const valueField = props.useComputed('valueField', (value) => value ?? rowKey);
    const sorting = props.useComputed('sorting', (value) => value);
    const selection = props.useRef('selection', (v) => v);
    const multiple = props.useRef('multiple', (v) => v);
    const typeColumns = _.cond([
      [
        _.matches({ multiple: true, selection: true }),
        _.constant([
          {
            colKey: 'row-select',
            title: '复选框',
            type: 'multiple',
          },
        ]),
      ],
      [
        _.matches({ selection: true }),
        _.constant([
          {
            colKey: 'row-radio',
            type: 'single',
          },
        ]),
      ],
      [_.stubTrue, _.constant([])],
    ])({ selection: selection.value, multiple: multiple.value });
    const sort = ref<string | null>(sorting.value?.field);
    const order = ref<string | null>(sorting.value?.order);
    const tree = props.useComputed('treeDisplay', (value) => (value
      ? {
        childrenKey: 'chiildren',
      }
      : undefined));

    const data = props.useComputed('data', (v) => {
      const treeDisplay = props.get('treeDisplay');
      const parentField = props.get<string>('parentField') || 'parent';
      if (!treeDisplay) return v;
      return listToTree(v, {
        valueField: valueField.value,
        parentField,
        childrenField: 'chiildren',
      });
    });
    const dragSort = props.useComputed('dragSort', (value) => (value === 'false' ? undefined : value));
    const autoMergeFields = ref([]);
    const rowspanAndColspan = ({ row, col }) => {
      return row?.rowspan?.[col.colKey] > 1
        ? {
          rowspan: row?.rowspan?.[col.colKey],
        }
        : {};
    };
    watch(
      () => [autoMergeFields.value, data.value],
      (value, oldValue) => {
        if (_.isEqual(value, oldValue)) return;
        const [autoMergeFields, data] = value;
        if (_.isEmpty(autoMergeFields) || _.isEmpty(data)) return;
        data.forEach((item, index) => {
          _.forEach(autoMergeFields, (field) => {
            let rowspan = 1;
            for (let i = index + 1; i < data.length; i++) {
              const isPreMerge = _.get(item, `rowspan.${field.colKey}`);
              const dataFieldValue = _.get(data[i], field.colKey);
              const itemFieldValue = _.get(item, field.colKey);
              if (isPreMerge || dataFieldValue !== itemFieldValue) break;
              rowspan++;
              item.rowspan = _.merge(item.rowspan, { [field.colKey]: true });
            }
            item.rowspan = _.merge(item.rowspan, { [field.colKey]: rowspan });
          });
        });
      },
    );

    const renderSlot = (vnodes) => {
      const columns = vnodes?.flatMap((vnode) => {
        if (!vnode.tag?.includes('ElTableColumnPro')) return [];
        const attrs = _.get(vnode, 'data.attrs', {});

        const nodePath = _.get(attrs, 'data-nodepath');
        const { cell, title } = _.get(vnode, 'data.scopedSlots', {});

        const titleProps = _.isFunction(title)
          ? { title: (h, { row, rowIndex, col }) => title({ row, index: rowIndex, col }) }
          : {};

        const cellRender = _.cond([
          [
            _.conforms({ cell: _.isFunction, type: _.isNil }),
            _.constant({ cell: (h, { row, rowIndex, col }) => cell({ item: row, index: rowIndex, col }) }),
          ],
          [
            _.matches({ type: 'number' }),
            _.constant({ cell: (h, { rowIndex }) => pageSize.value * (current.value - 1) + rowIndex + 1 }),
          ],
          [_.conforms({ type: _.isString }), _.constant({})],
        ]);
        const cellProps = cellRender({ type: attrs.type, cell });
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
      return typeColumns.concat(columns).filter((item) => !_.isEmpty(item));
    };
    const scroll = props.useComputed('virtual', (value) => (value ? { scroll: { type: 'virtual' } } : {}));

    const onLoadData = props.get('onLoadData');

    const onPageChange = props.useComputed('onPageChange', (value) => {
      return (pageInfo) => {
        pageSize.value = pageInfo.pageSize;
        current.value = pageInfo.current;
        _.attempt(onLoadData, {
          page: pageInfo.current,
          size: pageInfo.pageSize,
          sort: sort.value,
          order: order.value,
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

    const totalContent = props.useComputed('showTotal', (value: boolean) => value ?? true);
    const showJumper = props.useComputed('showJumper', (value: boolean) => value ?? true);

    const total = props.useComputed('total', (value) => value ?? 10);

    const paginationProps = props.useComputed('pagination');
    const pagination = computed(() => {
      if (paginationProps.value === false) {
        return false;
      }
      return {
        pageSizeOptions: pageSizeOptions.value,
        showJumper: showJumper.value,
        current: current.value,
        total: total.value,
        pageSize: pageSize.value,
        totalContent: totalContent.value,
      };
    });

    // 产品要求默认开边框
    const bordered = props.useComputed('bordered', (v) => (isNil(v) ? true : v));

    const onSortChange = props.useComputed('onSortChange', (value) => {
      return (...arg) => {
        if (arg[0]) {
          sort.value = _.get(arg, '0.sortBy');
          order.value = _.get(arg, '0.descending') ? 'desc' : 'asc';
        } else {
          sort.value = null;
          order.value = null;
        }
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
      data,
      onPageChange,
      dragSort,
      ...scroll.value,
      pagination,
      tree,
      rowKey: valueField,
      // tree: {
      //   childrenKey: 'chiildren',
      // },
      rowspanAndColspan,
      onSortChange,
      slotExpandedRow: computed(() => {
        const slotExpandedRow = props.get<Slot>('slotExpandedRow');
        if (!slotExpandedRow) return undefined;
        return ({ row }) => slotExpandedRow({ item: row });
      }),
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
      [$render](resultVNode, h, context) {
        const vnodes = ctx.setupContext.slots?.default?.();
        const columns = renderSlot(vnodes);
        autoMergeFields.value = columns?.filter?.((item) => item.autoMerge) ?? [];
        if (tree.value) {
          context.propsData.props.columns = columns;
          return h(EnhancedTable, context.propsData, context.childrenNodes);
        }
        resultVNode.componentOptions.propsData.columns = columns;
        return resultVNode;
      },
    };
  },
};

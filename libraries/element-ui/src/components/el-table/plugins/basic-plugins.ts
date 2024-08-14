/* 组件功能扩展插件 */
import {
  watch, shallowRef, useAttrs, provide,
} from '@vue/composition-api';
import { at } from 'lodash';
import Pagination from 'element-ui/lib/pagination';
import type { NaslComponentPluginOptions } from '@/plugins/plugin';
import { $deletePropList, $ref, $render } from '@/plugins/constants';
import styles from '../index.module.css';

export { useDataSource, useInitialLoaded } from '@lcap/nasl-hoc-vue/index';

const getVusionProps = () => {
  const attrs = useAttrs();
  const props = {};

  Object.keys(attrs).forEach((k) => {
    if (k.startsWith('vusion') || k.startsWith('data-')) {
      props[k] = attrs[k];
    }
  });

  return props;
};

export const useLoadData: NaslComponentPluginOptions = {
  props: ['pagination', 'pageSize', 'sorting'],
  setup: (props) => {
    const currentPage = shallowRef(1);
    const sort = props.useRef(['sortField', 'order'], (sortField, order) => {
      if (!sortField) {
        return;
      }

      return {
        prop: sortField,
        order: order === 'descending' ? 'descending' : 'ascending',
      };
    });
    const pageSize = props.useRef('pageSize', (v) => v || 20);

    const loadDataFnRef = props.useRef('onLoadData', (v) => {
      if (!v) {
        return undefined;
      }

      const pagination = props.get('pagination');

      if (!pagination) {
        return v;
      }

      return async (rest = {}) => {
        const result = await v({
          page: currentPage.value,
          size: pageSize.value,
          sort: sort.value ? sort.value.prop : '',
          order: sort.value && sort.value.order === 'descending' ? 'desc' : 'asc',
          ...rest,
        });

        const onLoaded = props.get('onLoaded');
        if (typeof onLoaded === 'function') {
          onLoaded(result);
        }
        return result;
      };
    });

    provide('getPagination', () => ({ currentPage: props.getEnd('currentPage'), pageSize: props.getEnd('pageSize') }));

    return {
      currentPage,
      pageSize,
      defaultSort: sort,
      onPageChange: (n: number) => {
        const onPageChange = props.get('onPageChange');
        const oldValue = currentPage.value;
        currentPage.value = n;
        if (loadDataFnRef.value) {
          loadDataFnRef.value();
        }
        if (typeof onPageChange === 'function') {
          onPageChange({
            value: n,
            oldValue,
          });
        }
      },
      onSizeChange: (size: number) => {
        const onSizeChange = props.get('onSizeChange');
        const oldValue = pageSize.value;
        const oldPage = currentPage.value;
        pageSize.value = size;
        currentPage.value = 1;
        if (loadDataFnRef.value) {
          loadDataFnRef.value();
        }

        if (typeof onSizeChange === 'function') {
          onSizeChange({
            value: size,
            oldValue,
            page: 1,
            oldPage,
          });
        }
      },
      onSortChange: ({ prop, order }) => {
        const onSortChange = props.get('onSortChange');
        sort.value = {
          prop,
          order,
        };

        if (loadDataFnRef.value) {
          loadDataFnRef.value();
        }

        if (typeof onSortChange === 'function') {
          onSortChange(sort.value);
        }
      },
      onLoadData: loadDataFnRef,
      [$ref]: {
        reload(params: any = {}) {
          currentPage.value = 1;
          if (!loadDataFnRef.value) {
            return;
          }

          if (params && params.page) {
            currentPage.value = params.page;
          }

          return loadDataFnRef.value(params);
        },
      },
      [$deletePropList]: ['currentPage', 'pageSize'],
    };
  },
  order: 2,
};

export const useCurrentRow: NaslComponentPluginOptions = {
  props: ['valueField', 'value'],
  setup: (props, { setupContext: ctx }) => {
    const rowKey = props.useComputed<string>('valueField');
    const value = props.useRef('value');
    let changed = true;

    if (rowKey.value) {
      const setCurrentRow = (v) => {
        const data = props.get<any[]>('data');
        if (!changed) {
          changed = true;
          return;
        }

        if (!data || !data.length || !ctx.refs.$base) {
          return;
        }

        const row = data.find((item) => at(item, rowKey.value)[0] === value.value);
        (ctx.refs.$base as any).setCurrentRow(row);
      };

      // 加载数据完成时选择行
      watch(() => props.get('loading'), (v, oldV) => {
        if (!v && oldV) {
          setCurrentRow(value.value);
        }
      });

      watch(value, setCurrentRow);
    }

    return {
      rowKey,
      value,
      onCurrentChange: (row, oldRow) => {
        const onCurrentChange = props.get<any>('onCurrentChange');
        const updateValue = props.get<(v) => void>('update:value');
        const valueField = rowKey.value;
        if (valueField) {
          const newValue = at(row, valueField)[0];
          if (value.value !== newValue) {
            updateValue(value.value);
            changed = false;
          }
        }
        if (onCurrentChange) {
          onCurrentChange({
            value: valueField ? at(row, valueField)[0] : null,
            oldValue: valueField ? at(oldRow, valueField)[0] : null,
            item: row,
            oldItem: oldRow,
          });
        }
      },
      [$ref]: {
        props: ['value'],
      },
    };
  },
  order: 8,
};

export const useSelection: NaslComponentPluginOptions = {
  props: ['values'],
  setup: (props, { setupContext: ctx }) => {
    const values = props.useRef('values', (v) => v || []);
    const rowKey = props.get<string>('valueField');
    let changed = true;

    if (rowKey) {
      const setSelection = (selectValues: any[]) => {
        const data = props.get<any[]>('data');
        if (!changed) {
          changed = true;
          return;
        }

        if (!data || !data.length || !ctx.refs.$base) {
          return;
        }

        (ctx.refs.$base as any).clearSelection();
        data.filter((item) => selectValues.includes(at(item, rowKey)[0])).forEach((row) => {
          (ctx.refs.$base as any).toggleRowSelection(row, true);
        });
      };

      // 加载数据完成时选择行
      watch(() => props.get('loading'), (v, oldV) => {
        if (!v && oldV) {
          ctx.root.$nextTick(() => setSelection(values.value));
        }
      });

      watch(values, setSelection);
    }

    return {
      onSelect: (selection: any[], row: any) => {
        const onSelect = props.get<any>('onSelect');
        const updateValues = props.get<(v) => void>('update:values');

        if (rowKey) {
          values.value = selection.map((it) => at(it, rowKey)[0]);
          updateValues(values.value);
          changed = false;
        }

        if (onSelect) {
          onSelect({
            item: {
              ...row,
            },
            values: values.value,
            items: [...selection],
          });
        }
      },
      onSelectAll: (selection: any[]) => {
        changed = false;
        const onSelectAll = props.get<any>('onSelectAll');
        const updateValues = props.get<(v) => void>('update:values');

        if (rowKey) {
          values.value = selection.map((it) => at(it, rowKey)[0]);
          updateValues(values.value);
        }

        if (onSelectAll) {
          onSelectAll({
            values: values.value,
            items: [...selection],
          });
        }
      },
      [$ref]: {
        props: ['values'],
      },
    };
  },
  order: 8,
};

export const useConcatPagination: NaslComponentPluginOptions = {
  props: ['currentPage', 'pageSize', 'total', 'pagePosition', 'showSizer', 'pageSizeOptions', 'showTotal', 'showJumper'],
  setup: ({ useRef }, { isDesigner }) => {
    const paginationProps = useRef(
      ['showSizer', 'pageSizeOptions', 'showTotal', 'showJumper', 'pageSize', 'currentPage', 'total'],
      (
        showSizer,
        pageSizeOptions,
        showTotal,
        showJumper,
        pageSize,
        currentPage,
        total,
      ) => {
        const layouts = ['prev', 'pager', 'next'];
        const defaultProps = {
          small: false,
          background: true,
          pagerCount: 7,
          hideOnSinglePage: !isDesigner,
          layout: layouts.join(','),
          pageSize,
          currentPage,
          total,
          pageSizes: pageSizeOptions || [10, 20, 50],
        };

        if (showSizer !== false) {
          layouts.unshift('sizes');
        }

        if (showTotal === true) {
          layouts.unshift('total');
        }

        if (showJumper === true) {
          layouts.push('jumper');
        }

        defaultProps.layout = layouts.join(',');

        return defaultProps;
      },
    );

    return {
      [$render]: (vnode, h, { props, listeners }) => {
        return h('div', {
          attrs: getVusionProps(),
          directives: [{
            name: 'loading',
            value: props.loading,
          }],
          class: styles.tableWrap,
        }, [
          vnode,
          props.pagination && props.data && props.data.length > 0 ? h(Pagination, {
            attrs: {
              ...paginationProps.value,
            },
            class: styles.pagination,
            style: {
              textAlign: props.pagePosition || 'right',
            },
            on: {
              'current-change': listeners['page-change'],
              'size-change': listeners['size-change'],
            },
          }) : null,
        ]);
      },
      [$deletePropList]: ['onPageChange', 'onSizeChange'],
    };
  },
  order: 3,
};

export const useEvents = {
  setup: (props) => {
    const eventMap = {};

    ['onCellMouseEnter', 'onCellMouseLeave', 'onCellClick', 'onCellDblclick'].forEach((eventName) => {
      eventMap[eventName] = (row, column, cell, event) => {
        const listener = props.get(eventName);
        if (typeof listener === 'function') {
          listener({
            item: row,
            column,
            cell,
            event,
          });
        }
      };
    });

    ['onRowClick', 'onRowContextmenu', 'onRowDblclick'].forEach((eventName) => {
      eventMap[eventName] = (row, column, event) => {
        const listener = props.get(eventName);
        if (typeof listener === 'function') {
          listener({
            item: row,
            column,
            event,
          });
        }
      };
    });

    ['onHeaderClick', 'onHeaderContextmenu'].forEach((eventName) => {
      eventMap[eventName] = (column, event) => {
        const listener = props.get(eventName);
        if (typeof listener === 'function') {
          listener({
            column,
            event,
          });
        }
      };
    });

    return {
      ...eventMap,
      onHeaderDragend(newWidth, oldWidth, column, event) {
        const listener = props.get('onHeaderDragend');
        if (typeof listener === 'function') {
          listener({
            newWidth,
            oldWidth,
            column,
            event,
          });
        }
      },
      onExpandChange(row, params) {
        const listener = props.get('onExpandChange');
        if (typeof listener === 'function') {
          listener({
            item: row,
            expandedItems: Array.isArray(params) ? params : [],
            expanded: Array.isArray(params) ? false : params,
          });
        }
      },
    };
  },
  order: 2,
};

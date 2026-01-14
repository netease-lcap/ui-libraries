import { ElPagination, ElTableV2, TableProps, PaginationProps } from 'element-plus';
import _ from 'lodash';
import fp from 'lodash/fp';
import { VNode } from 'vue';
import { useMemo, useRef, useCallback, useControllableValue, useState, useEffect, useRender } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { useRequestDataSource, useDataSourceToTree } from '@/plugins/common/dataSource';
import { categoryStyles } from '@/utils';
import { ElTableToolBar } from '@/components/el-table';
import { ElForm, ElLoading } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types/pluginBase';

const orderMap = {
  descending: 'desc',
  ascending: 'asc',
};

const formatResult = _.cond([
  [Array.isArray, (list) => ({ list, total: list.length, pageLocal: true })],
  [_.conforms({ list: _.isArray }), _.identity],
  [fp.stubTrue, fp.constant({ list: [], total: 0, pageLocal: true })],
]) as (Target: { list: unknown }) => {
  list: any;
  total: number;
  pageLocal?: boolean;
};

const TableAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTableOptions<any, any, any, any>,
  IIdePluginBase &
    TableProps<any> &
    PaginationProps & {
      onBefore:(params: any) => void;
      onSelectAll: (selection: any[]) => any;
      onExpandChange:(row: any, expanded: boolean) => void;
      editTable: boolean;
    }
>();

export default TableAccumulate.addPlugin({
  name: 'handleSortState',
  handle(props) {
    const emit = props.get('emit');
    const deletePropsList = props.get($deletePropsList).concat(['sort', 'order', 'setSort', 'setOrder']);
    const [sort, setSort] = useControllableValue(props, {
      defaultValuePropName: 'defaultField',
      defaultValue: '',
      valuePropName: 'field',
    });
    const [order, setOrder] = useControllableValue(props, {
      defaultValuePropName: 'defaultOrder',
      defaultValue: '',
      valuePropName: 'order',
      onChange: (order) => {
        emit('sync:state', 'order', orderMap[order]);
      },
    });

    return {
      [$deletePropsList]: deletePropsList,
      sort,
      setSort,
      order,
      setOrder,
      defaultSort: {
        prop: sort,
        order,
      },
    };
  },
})
  .addPlugin({
    name: 'handlePageState',
    handle(props) {
      const ref = props.get('ref');
      const deletePropsList = props
        .get($deletePropsList)
        .concat(['currentPage', 'pageSize', 'pageSizes', 'setCurrentPage', 'setPageSize', 'setPageSizes']);
      const [currentPage, setCurrentPage, currentPageProps] = useControllableValue(props, {
        defaultValuePropName: 'defaultCurrentPage',
        defaultValue: 1,
        valuePropName: 'currentPage',
        onChange: (currentPage, pageSize = {}) => {
          _.attempt(ref?.reload, { currentPage, ...pageSize });
        },
      });
      const [pageSize, setPageSize, pageSizeProps] = useControllableValue(props, {
        defaultValuePropName: 'defaultPageSize',
        defaultValue: 10,
        valuePropName: 'pageSize',
        onChange: (pageSize) => {
          setCurrentPage(1, { pageSize });
        },
      });
      const pageSizesProps = props.get('pageSizes');
      const pageSizes = useMemo(() => {
        const jsonPageSizes = _.isString(pageSizesProps) ? _.attempt(JSON.parse, pageSizesProps) : pageSizesProps;
        return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
      }, [pageSizesProps]);

      return {
        [$deletePropsList]: deletePropsList,
        pageProps: {
          ...currentPageProps,
          ...pageSizeProps,
          pageSizes,
        },
        provide: {
          currentPage,
          pageSize,
        },
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        pageSizes,
      };
    },
  })
  .addPlugin({
    name: 'handlePageProps',
    handle(props) {
      const pagination = props.get('pagination');
      const pageProps = props.get('pageProps');
      const total = props.get('total');
      const showTotal = props.get('showTotal');
      const showJumper = props.get('showJumper');
      const onPageChange = props.get('onPageChange', () => {});
      const layout = `${showTotal ? 'total' : ''},prev, pager, next,${showJumper ? 'jumper' : ''},sizes,`;
      return {
        pageProps: {
          ...pageProps,
          layout,
          total,
          onPageChange,
        },
        pagination,
      };
    },
  })
  .addPlugin({
    name: 'handleSticky',
    handle(props) {
      const stickyName = props.get('sticky') ? 'sticky-table' : '';
      const className = props.get('class', '');
      const classNames = `${stickyName} ${className}`;
      const styleProps = props.get('style') as Record<string, any>;
      const stickyOffset = props.get('stickyOffset', 8);
      return {
        class: classNames,
        style: {
          '--el-table-sticky-offset': `${stickyOffset}px`,
          ...styleProps,
        },
      };
    },
  })
  .addPlugin({
    name: 'handleSort',
    handle(props) {
      const emit = props.get('emit');
      const ref = props.get('ref');
      const pagination = props.get('pagination');
      const setSort = props.get('setSort');
      const setOrder = props.get('setOrder');
      const onSort = props.get('onSort', () => {});
      const onSortChange = useCallback(
        ({ prop, order }) => {
          setSort(prop);
          setOrder(order);
          _.attempt(ref?.reload, { sort: prop, order, pagination });
          _.attempt(onSort, { field: prop, order });
        },
        [ref, emit, pagination],
      );

      return {
        onSortChange,
      };
    },
  })
  .addPlugin({
    name: 'handleTextAlign',
    handle(props) {
      const textAlign = _.get(props.get('style'), 'text-align', 'left');
      const styleProps = props.get('style') as Record<string, any>;
      return {
        style: {
          '--cw-style-text-align': textAlign,
          ...styleProps,
        },
      } as {
        style: Record<string, any>;
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      const emit = props.get('emit');
      const data = props.get('data');
      const currentPage = props.get('currentPage');
      const pageSize = props.get('pageSize');
      const order = props.get('order');
      const sort = props.get('sort');
      const pageProps = props.get('pageProps');
      useEffect(() => {
        emit('sync:state', 'data', data);
        emit('sync:state', 'currentPage', currentPage);
        emit('sync:state', 'pageSize', pageSize);
        emit('sync:state', 'sort', sort);
        emit('sync:state', 'order', orderMap[order]);
        emit('sync:state', 'total', pageProps.total);
      }, [data, currentPage, pageSize, order, sort, pageProps.total]);
      return {};
    },
  })
  .addPlugin({
    name: 'handleDataSource',
    handle(props) {
      const dataSource = props.get('dataSource');
      const currentPage = props.get('currentPage');
      const pagination = props.get('pagination');
      const pageSize = props.get('pageSize');
      const order = props.get('order');
      const sort = props.get('sort');
      const pageProps = props.get('pageProps');
      const onBefore = props.get('onBefore', () => {});
      const onSuccess = props.get('onSuccess', () => {});
      const ref = props.get('ref');
      const initialLoad = props.get('initialLoad', true);
      const defaultParams = [{ currentPage, pageSize, order, sort, pagination }];
      const rowKey = props.get('rowKey');
      const parentField = props.get('parentField');
      const {
        data: resultData = { list: [], total: 0 },
        run,
        loading,
      } = useRequestDataSource(dataSource, {
        onBefore: (params) => _.attempt(onBefore, params),
        onSuccess: (data, params) => _.attempt(onSuccess, data, params),
        manual: !initialLoad,
        defaultParams,
        formatResult,
      });
      const reload = (params) => {
        run({ currentPage, pageSize, order, sort, pagination, ...params });
      };
      const { list: data, total } = resultData as { list: any; total: number };
      const treeData = useMemo(
        () => useDataSourceToTree(data, parentField, rowKey as string),
        [data, parentField, rowKey],
      );
      const loadTo = useCallback((page) => reload({ currentPage: page }), [reload]);
      const selfRef = _.assign(ref, { reload, loadTo, data: treeData, getData: () => data });

      const dataSourceResult = _.isEmpty(treeData) ? {} : { data: treeData };
      return {
        ref: selfRef,
        pageProps: _.assign(pageProps, { total }),
        reload,
        loading,
        ...dataSourceResult,
      };
    },
  })
  .addPlugin({
    name: 'handlePaginationRender',
    handle(props) {
      const Component = props.get('render');
      const ref = props.get('ref');
      const nodepath = props.get('data-nodepath');
      const tableRef = useRef({});
      const styleProps = props.get('style');
      const { style, innerStyle } = categoryStyles(styleProps);
      return {
        ref: Object.assign(ref, _.omit(tableRef.value, ['reload', 'data'])),
        tableStyle: innerStyle,
        style,
        render: useCallback((props, { attrs, slots }) => {
          return [
            <div data-nodepath={nodepath} style={{ ...props.style }} class="el-table-wrapper">
              <Component
                ref={tableRef}
                {..._.omit({ ...props, ...attrs }, ['style', 'data-nodepath'])}
                style={attrs.tableStyle}
                v-slots={slots}
                v-loading={props.loading}
              />
              {props.pagination && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <ElPagination {...props.pageProps} total={props?.pageProps?.total} />
                </div>
              )}
            </div>,
          ];
        }, []),
      };
    },
  })
  .addPlugin({
    name: 'handleEditTable',
    handle(props) {
      const slots = props.get('slots');
      const editTable = props.get('editTable');
      const editableColumn = _.find(_.attempt(slots?.default), (node) => _.get(node, 'props.type') === 'editable');
      if (!editTable && !editableColumn) return {};
      const ref = props.get('ref');
      const Component = props.get('render');
      const tableRef = useRef({});
      const render = useRender((props, { attrs, slots }) => {
        return (
          <ElForm style={{ width: '100%' }}>
            <Component ref={tableRef} {...props} {...attrs} v-slots={slots} />
          </ElForm>
        );
      }, []);
      return {
        ref: Object.assign(ref, _.omit(tableRef.value, ['reload', 'data'])),
        render,
      };
    },
  })
  .addPlugin({
    name: 'handleTableConfig',
    handle(props) {
      const columnConfig = props.get('columnConfig');
      if (!columnConfig) return {};
      const Component = props.get('render');
      const tableRef = useRef({});
      const render = useRender((props, { attrs, slots }) => {
        const columns = _.flatMap(slots.default(), (node) => (node.type.name === 'ElTableColumn' && node.props.prop
            ? [{ ...node.props, header: node.children?.header }]
            : []));
        const [selectedColumns, setSelectedColumns] = useState(columns.map((item) => item.prop));
        return (
          <div style={{ ...props.style }} class="el-table-wrapper">
            <ElTableToolBar columns={columns} value={selectedColumns} onChange={setSelectedColumns} />
            <Component
              ref={tableRef}
              {...props}
              {...attrs}
              v-slots={{
                ...slots,
                default: () => slots.default().filter((item) => selectedColumns.includes(item.props.prop)),
              }}
            />
          </div>
        );
      }, []);
      return {
        render,
      };
    },
  })
  .addPlugin({
    name: 'handleHeight',
    handle(props) {
      const heightProps = props.get('height');
      const maxHeightProps = props.get('maxHeight');
      const styleProps = props.get('style');
      const height = heightProps || styleProps.height || undefined;
      const maxHeight = maxHeightProps || styleProps.maxHeight || undefined;

      return {
        height,
        maxHeight,
      };
    },
  })
  .addPlugin({
    name: 'handleSelectedValue',
    handle(props) {
      const ref = props.get('ref');
      const emit = props.get('emit');
      const currentChange = props.get('onCurrentChange', () => {});
      const rowKey = props.get('rowKey');
      const getRowKey = _.match(rowKey)
        .when(
          _.isString,
          _.constant((item) => _.get(item, rowKey as string, 'id')),
        )
        .when(_.isFunction, _.constant(rowKey))
        .otherwise(() => _.constant(undefined));
      const [selectedValue, setSelectedValue] = useControllableValue(props, {
        valuePropName: 'selectedValue',
        onValueEffect: (currentValue) => {
          ref?.store?.setCurrentRowKey(String(currentValue));
          emit('sync:state', 'selectedValue', currentValue);
        },
        onChange: (currentValue) => {
          emit('sync:state', 'selectedValue', currentValue);
        },
      });
      return {
        onCurrentChange: _.wrap(currentChange, (fn, value) => {
          fn({ row: value });
          setSelectedValue(getRowKey(value));
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleSelectedValues',
    handle(props) {
      const ref = props.get('ref');
      const data = props.get('data');
      const emit = props.get('emit');
      const selectionChange = props.get('onSelect', () => {});
      const selectAllChange = props.get('onSelectAll', () => {});
      const rowKey = props.get('rowKey');
      const getRowKey = _.match(rowKey)
        .when(
          _.isString,
          _.constant((item) => _.get(item, rowKey as string, 'id')),
        )
        .when(_.isFunction, _.constant(rowKey))
        .otherwise(() => _.constant(undefined));
      function getSelectedRows(data, selectedValues) {
        return _.map(selectedValues, (rowKey) => _.find(data, (item) => getRowKey(item) === rowKey)).filter(Boolean);
      }
      const [selectedValues, setSelectedValues] = useControllableValue(props, {
        valuePropName: 'selectedValues',
        onValueEffect: (currentValue) => {
          const selectRows = getSelectedRows(data, currentValue);
          emit('sync:state', 'selectedValues', currentValue);
          _.defer(() => {
            ref?.clearSelection?.();
            return _.map(selectRows, (row) => _.attempt(ref?.toggleRowSelection, row, true));
          }, 0);
        },
        onChange: (currentValue) => {
          emit('sync:state', 'selectedValues', currentValue);
        },
      });
      useEffect(() => {
        const selectRows = getSelectedRows(data, selectedValues);
        _.defer(() => _.map(selectRows, (row) => _.attempt(ref?.toggleRowSelection, row, true)), 0);
      }, [data]);
      return {
        onSelect: (value, ...arg) => {
          const newSelection = _.map(value, (item) => _.get(item, rowKey as string));
          _.attempt(selectionChange, { newSelection, items: value }, ...arg);
          setSelectedValues(newSelection);
        },
        onSelectAll: (value) => {
          const newSelection = _.map(value, (item) => _.get(item, rowKey as string));
          _.attempt(selectAllChange, { newSelection, items: value });
          setSelectedValues(newSelection);
        },
      };
    },
  })

  .addPlugin({
    name: 'handleClickMcp',
    handle: (props) => {
      const refId = props.get('data-ref-id');
      const reload = props.get('reload', () => {});
      useEffect(() => {
        if (window?.UiLibrariesMcp?.subscribe) {
          window.UiLibrariesMcp.subscribe('el_table__reload', refId, (...args) => {
            _.attempt(reload, ...(args as [any, any]));
          });
        }
        return () => {
          if (window?.UiLibrariesMcp?.unsubscribe) {
            window.UiLibrariesMcp.unsubscribe('el_table__reload', refId);
          }
        };
      }, []);
      return {};
    },
  })
  .addPlugin({
    name: 'handleEvent',
    handle(props) {
      const refProps = props.get('ref');
      const slots = props.get('slots');
      const onHeaderDragenaProps = props.get('onHeaderDragend', () => {});
      const onRowClickProps = props.get('onRowClick', () => {});

      const onHeaderDragend = useCallback(
        _.wrap(onHeaderDragenaProps, (fn, newWidth, oldWidth, TableColumnCtx) => {
          _.attempt(fn, { newWidth, oldWidth, field: _.get(TableColumnCtx, 'property') });
        }),
        [onHeaderDragenaProps],
      );
      const getFields = useCallback(() => {
        return _.flatMap(slots.default(), (node: VNode) => (_.get(node, 'type.name') === 'ElTableColumn' && node.props?.prop ? [node.props.prop] : []));
      }, [slots]);
      const ref = _.assign(refProps, { getFields: () => _.join(getFields(), ',') });
      return {
        getFields,
        onHeaderDragend,
        onRowClick: useCallback(
          (row) => {
            _.attempt(onRowClickProps, { row });
          },
          [onRowClickProps],
        ),
        ref,
      };
    },
  })
  .addPlugin({
    name: 'handleToggleExpanded',
    handle(props) {
      const onToggleExpanded = props.get('onToggleExpanded', () => {});
      const onToggleTreeExpanded = props.get('onToggleTreeExpanded', () => {});
      const onExpandChange = props.get('onExpandChange', () => {});
      return {
        onExpandChange: useCallback(
          (row, expanded) => {
            _.attempt(onExpandChange, row, expanded);
            const isTreeExpanded = _.isBoolean(expanded) && expanded;
            const isExpandRow = _.isArray(expanded);
            if (isTreeExpanded) {
              _.attempt(onToggleTreeExpanded, { item: row });
            }
            if (isExpandRow) {
              _.attempt(onToggleExpanded, { item: row, expanded });
            }
          },
          [onToggleExpanded, onToggleTreeExpanded],
        ),
      };
    },
  });

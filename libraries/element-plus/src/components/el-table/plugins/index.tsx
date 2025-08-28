import { ElPagination, ElTableV2 } from 'element-plus';
import _ from 'lodash';
import fp from 'lodash/fp';
import { useMemo, useRef, useCallback, useControllableValue, useState } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { useRequestDataSource, useDataSourceToTree } from '@/plugins/common/dataSource';
import { categoryStyles } from '@/utils';
import { ElTableToolBar } from '@/components/el-table';

const orderMap = {
  descending: 'desc',
  ascending: 'asc',
};
export function handleSortState(props) {
  const emit = props.get('emit');
  const deletePropsList = props.get($deletePropsList).concat(['sort', 'order', 'setSort', 'setOrder']);
  const [sort, setSort] = useControllableValue(props, {
    defaultValuePropName: 'defaultField',
    defaultValue: '',
    valuePropName: 'field',
    onChange: (sort) => {
      emit('sync:state', 'sort', sort);
    },
  });
  const [order, setOrder] = useControllableValue(props, {
    defaultValuePropName: 'defaultOrder',
    defaultValue: '',
    valuePropName: 'order',
    onChange: (order) => {
      emit('sync:state', 'order', orderMap[order]);
    },
  });
  useMemo(() => {
    emit('sync:state', 'sort', sort);
    emit('sync:state', 'order', orderMap[order]);
  }, []);
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
}
handleSortState.order = 2;
export function handlePageState(props) {
  const emit = props.get('emit');
  const ref = props.get('ref');
  const deletePropsList = props
    .get($deletePropsList)
    .concat(['currentPage', 'pageSize', 'pageSizes', 'setCurrentPage', 'setPageSize', 'setPageSizes']);
  const [currentPage, setCurrentPage, currentPageProps] = useControllableValue(props, {
    defaultValuePropName: 'defaultCurrentPage',
    defaultValue: 1,
    valuePropName: 'currentPage',
    onChange: (currentPage, pageSize = {}) => {
      emit('sync:state', 'currentPage', currentPage);
      _.attempt(ref?.reload, { currentPage, ...pageSize });
    },
  });
  const [pageSize, setPageSize, pageSizeProps] = useControllableValue(props, {
    defaultValuePropName: 'defaultPageSize',
    defaultValue: 10,
    valuePropName: 'pageSize',
    onChange: (pageSize) => {
      emit('sync:state', 'pageSize', pageSize);
      setCurrentPage(1, { pageSize });
    },
  });
  const pageSizesProps = props.get('pageSizes');
  const pageSizes = useMemo(() => {
    const jsonPageSizes = _.isString(pageSizesProps) ? _.attempt(JSON.parse, pageSizesProps) : pageSizesProps;
    return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
  }, [pageSizesProps]);

  useMemo(() => {
    emit('sync:state', 'currentPage', currentPage);
    emit('sync:state', 'pageSize', pageSize);
    return null;
  }, []);

  return {
    [$deletePropsList]: deletePropsList,
    pageProps: {
      ...currentPageProps,
      ...pageSizeProps,
      pageSizes,
    },
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageSizes,
  };
}
handlePageState.order = 2;
export function handlePageProps(props) {
  const pagination = props.get('pagination');
  const pageProps = props.get('pageProps');
  const total = props.get('total');
  const showTotal = props.get('showTotal');
  const showJumper = props.get('showJumper');
  const onPageChange = props.get('onPageChange', () => {});
  const onSelectionChange = props.get('onSelectionChange', () => {});
  const layout = `${showTotal ? 'total' : ''},prev, pager, next,${showJumper ? 'jumper' : ''},sizes,`;
  const rowKey = props.get('rowKey');

  return {
    pageProps: {
      ...pageProps,
      layout,
      total,
      onPageChange,
    },
    pagination,
    onSelectionChange: _.wrap(onSelectionChange, (fn, value: any) => {
      _.attempt(fn, { newSelection: _.map(value, (item) => _.get(item, rowKey)) });
    }),
  };
}
handlePageProps.order = 3;

const formatResult = _.cond([
  [Array.isArray, (list) => ({ list, total: list.length, pageLocal: true })],
  [_.conforms({ list: _.isArray }), _.identity],
  [fp.stubTrue, fp.constant({ list: [], total: 0, pageLocal: true })],
]) as (Target: { list: unknown }) => {
  list: any;
  total: number;
  pageLocal?: boolean;
};

export function handleSort(props) {
  const emit = props.get('emit');
  const ref = props.get('ref');
  const pagination = props.get('pagination');
  const setSort = props.get('setSort');
  const setOrder = props.get('setOrder');
  const onSortChange = useCallback(
    ({ prop, order }) => {
      setSort(prop);
      setOrder(order);
      _.attempt(ref?.reload, { sort: prop, order, pagination });
    },
    [ref, emit, pagination],
  );
  return {
    onSortChange,
  };
}
handleSort.order = 3;

// 如果是 list total 就是后端分页
export function handleDataSource(props) {
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
    defaultParams,
    formatResult,
  });
  const reload = (params) => {
    run({ currentPage, pageSize, order, sort, pagination, ...params });
  };
  const { list: data, total } = resultData as { list: any; total: number };
  const treeData = useDataSourceToTree(data, parentField, rowKey);
  const selfRef = _.assign(ref, { reload, data: treeData });

  const dataSourceResult = _.isEmpty(treeData) ? {} : { data: treeData };

  return {
    ref: selfRef,
    pageProps: _.assign(pageProps, { total }),
    loading,
    ...dataSourceResult,
  };
}

export function handlePaginationRender(props) {
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
    render: (props, { attrs, slots }) => {
      return [
        <div data-nodepath={nodepath} style={props.style}>
          <Component
            ref={tableRef}
            {..._.omit({ ...props, ...attrs }, ['style', 'data-nodepath'])}
            style={attrs.tableStyle}
            v-slots={slots}
          />
          {props.pagination && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <ElPagination {...props.pageProps} total={props.pageProps.total} />
            </div>
          )}
        </div>,
      ];
    },
  };
}

export function handleEditTable(props) {
  const editTable = props.get('editTable');
  if (!editTable) return {};
  const ref = props.get('ref');
  const Component = props.get('render');
  const tableRef = useRef({});
  const render = useCallback((props, { attrs, slots }) => {
    return (
      <el-form>
        <Component ref={tableRef} {...props} {...attrs} v-slots={slots} />
      </el-form>
    );
  }, []);
  render.inheritAttrs = false;
  return {
    ref: Object.assign(ref, _.omit(tableRef.value, ['reload', 'data'])),
    render,
  };
}

export function handleTableConfig(props) {
  const columnConfig = props.get('columnConfig');
  if (!columnConfig) return {};
  const Component = props.get('render');
  const tableRef = useRef({});
  const render = useCallback((props, { attrs, slots }) => {
    const columns = _.flatMap(slots.default(), (node) => (node.type.name === 'ElTableColumn' && node.props.prop ? [{ ...node.props }] : []));
    const [selectedColumns, setSelectedColumns] = useState(columns.map((item) => item.prop));
    return (
      <div>
        <ElTableToolBar columns={columns} selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
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
  render.inheritAttrs = false;
  return {
    render,
  };
}

export function handleHeight(props) {
  const height = props.get('height');
  const maxHeight = props.get('maxHeight');

  return {
    height: height === '' ? undefined : height,
    maxHeight: maxHeight === '' ? undefined : maxHeight,
  };
}

export function handleSticky(props) {
  const stickyName = props.get('sticky') ? 'sticky-table' : '';
  const className = props.get('class', '');
  const classNames = `${stickyName} ${className}`;
  const styleProps = props.get('style');
  const stickyOffset = props.get('stickyOffset', 8);
  return {
    class: classNames,
    style: {
      '--el-table-sticky-offset': `${stickyOffset}px`,
      ...styleProps,
    },
  };
}
handleSticky.order = 3;

function handleVirtualize(props) {
  const virtualize = props.get('virtualize');
  if (!virtualize) return {};
  const tableRef = useRef({});
  const slots = props.get('slots');
  const columnsSlots = slots.default();

  const columns = _.flatMap(columnsSlots, (node) => {
    if (node.type.name === 'ElTableColumn') {
      return [{ ...node.props, header: node.children.header, default: node.children.default }];
    }
    return [];
  });

  const render = useCallback((props, { attrs, slots }) => {
    return <ElTableV2 ref={tableRef} {...props} {...attrs} v-slots={slots} />;
  }, []);
  render.inheritAttrs = false;
  return {};
}

handleVirtualize.order = 2;

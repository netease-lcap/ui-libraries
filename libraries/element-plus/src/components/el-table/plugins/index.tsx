import { ElPagination, ElConfigProvider } from 'element-plus';
import _ from 'lodash';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import fp from 'lodash/fp';
import { useMemo, useRef, useCallback, useEffect, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { useRequestDataSource } from '@/plugins/common/dataSource';

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
  const deletePropsList = props
    .get($deletePropsList)
    .concat(['currentPage', 'pageSize', 'pageSizes', 'setCurrentPage', 'setPageSize', 'setPageSizes']);
  const [currentPage, setCurrentPage, currentPageProps] = useControllableValue(props, {
    defaultValuePropName: 'defaultCurrentPage',
    defaultValue: 1,
    valuePropName: 'currentPage',
    onChange: (currentPage) => {
      emit('sync:state', 'currentPage', currentPage);
    },
  });
  const [pageSize, setPageSize, pageSizeProps] = useControllableValue(props, {
    defaultValuePropName: 'defaultPageSize',
    defaultValue: 10,
    valuePropName: 'pageSize',
    onChange: (pageSize) => {
      emit('sync:state', 'pageSize', pageSize);
    },
  });
  const pageSizesProps = props.get('pageSizes');
  const pageSizes = useMemo(() => {
    const jsonPageSizes = _.attempt(JSON.parse, pageSizesProps);
    return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
  }, [pageSizesProps]);

  useMemo(() => {
    emit('sync:state', 'currentPage', currentPage);
    emit('sync:state', 'pageSize', pageSize);
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
  const onChange = props.get('onPageChange', () => {});
  const onSelectionChange = props.get('onSelectionChange', () => {});
  const layout = `${showTotal ? 'total' : ''},prev, pager, next,${showJumper ? 'jumper' : ''},sizes,`;
  const ref = props.get('ref');
  const emit = props.get('emit');
  const setCurrentPage = props.get('setCurrentPage');
  const setPageSize = props.get('setPageSize');
  const pageChange = useCallback(
    _.wrap(onChange, (fn, currentPage, pageSize) => {
      setCurrentPage(currentPage);
      setPageSize(pageSize);
      _.attempt(fn, currentPage, pageSize);
      _.attempt(ref?.reload, { currentPage, pageSize });
    }),
    [ref, emit],
  );

  return {
    pageProps: {
      ...pageProps,
      layout,
      total,
      onChange: pageChange,
      onSizeChange: (pageSize) => {
        setPageSize(pageSize);
        setCurrentPage(1);
        _.attempt(ref?.reload, { currentPage: 1, pageSize });
      },
    },
    pagination,
    onSelectionChange: _.wrap(onSelectionChange, (fn, value) => {
      _.attempt(fn, { newSelection: value });
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
  const setSort = props.get('setSort');
  const setOrder = props.get('setOrder');
  const onSortChange = useCallback(
    ({ prop, order }) => {
      setSort(prop);
      setOrder(order);
      _.attempt(ref?.reload, { sort: prop, order });
    },
    [ref, emit],
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
  const pageSize = props.get('pageSize');
  const order = props.get('order');
  const sort = props.get('sort');
  const pageProps = props.get('pageProps');
  const onBefore = props.get('onBefore', () => {});
  const onSuccess = props.get('onSuccess', () => {});
  const ref = props.get('ref');
  const defaultParams = [{ currentPage, pageSize, order, sort }];
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
    run({ currentPage, pageSize, order, sort, ...params });
  };
  const { list: data, total } = resultData as { list: any; total: number };
  const selfRef = useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  const dataSourceResult = _.isEmpty(data) ? {} : { data };

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
  return {
    ref: Object.assign(ref, tableRef.value),
    render: (props, { attrs, slots }) => {
      return [
        <div data-nodepath={nodepath} style={props.style}>
          <Component
            ref={tableRef}
            {..._.omit({ ...props, ...attrs }, ['style'])}
            style={_.pickBy(props.style, (value, key) => key?.startsWith('--'))}
            v-slots={slots}
          />
          <ElConfigProvider v-if={props.pagination} locale={zhCn}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <ElPagination {...props.pageProps} total={props.pageProps.total} />
            </div>
          </ElConfigProvider>
        </div>,
      ];
    },
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

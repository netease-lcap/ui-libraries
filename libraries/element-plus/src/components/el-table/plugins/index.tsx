import { ElPagination, ElConfigProvider } from 'element-plus';

import _ from 'lodash';
// import zhCn from "element-plus/lib/locale/lang/zh-cn"
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import fp from 'lodash/fp';
import omit from 'lodash/omit';
import { useMemo, useRef, useCallback } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';

import { useRequestDataSource } from '@/plugins/common/dataSource';

export function handlePageProps(props) {
  const pagination = props.get('pagination');
  const pageSizesProps = props.get('pageSizes');
  const defaultPageSize = props.get('pageSize') || 10;
  const showTotal = props.get('showTotal');
  const showJumper = props.get('showJumper');
  const onChange = props.get('onPageChange', () => {});
  const defaultCurrentPage = props.get('currentPage') || 1;
  const onSelectionChange = props.get('onSelectionChange', () => {});
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const layout = `${showTotal ? 'total' : ''},prev, pager, next,${showJumper ? 'jumper' : ''},sizes,`;
  const pageSizes = useMemo(() => {
    const jsonPageSizes = _.attempt(JSON.parse, pageSizesProps);
    return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
  }, [pageSizesProps]);

  return {
    pageProps: {
      defaultCurrentPage,
      defaultPageSize,
      pageSizes,
      layout,
      onChange,
    },
    [$deletePropsList]: deletePropsList,
    pagination,
    onSelectionChange: _.wrap(onSelectionChange, (fn, value) => {
      _.attempt(fn, { newSelection: value });
    }),
  };
}
handlePageProps.order = 3;

const warpList = _.cond([
  [Array.isArray, (list) => ({ list, total: list.length })],
  [_.isPlainObject, (data) => data],
  [_.conforms({ list: _.isArray }), _.identity],
  [fp.stubTrue, fp.constant({ list: [], total: 0 })],
]) as (Target: { list: unknown }) => {
  list: any;
  total: number;
};
const transformOption = fp.cond([
  [fp.isArray, (dataSource) => async () => ({ list: dataSource, total: dataSource.length })],
  [_.isPlainObject, (dataSource) => () => dataSource],
  [
    fp.isFunction,
    (dataSource) => async (...arg) => Promise.resolve(dataSource(...arg)).then(warpList),
  ],
  [fp.stubTrue, () => async () => ({ list: [], total: 0 })],
]);
const getOrder = _.cond([
  [_.matches('descending'), _.constant('desc')],
  [_.matches('desc'), _.constant('descending')],
  [_.matches('ascending'), _.constant('asc')],
  [_.matches('asc'), _.constant('ascending')],
  [_.stubTrue, _.constant(undefined)],
]);
export function handleDataSource(props) {
  const dataSource = props.get('dataSource');
  const pageProps = props.get('pageProps');
  const { defaultCurrentPage: currentPage, defaultPageSize: pageSize, onChange = () => {} } = pageProps;
  const sort = props.get('field');
  const order = props.get('order');
  const emit = props.get('emit');
  const onBefore = props.get('onBefore', () => {});
  const onSuccess = props.get('onSuccess', () => {});
  const ref = props.get('ref');
  const memoTransformOption = useMemo(() => transformOption(dataSource), [dataSource]);
  emit('sync:state', 'currentPage', currentPage);
  emit('sync:state', 'pageSize', pageSize);
  const defaultParams = [{ currentPage, pageSize, sort, order }];
  const {
    data: resultData = { list: [], total: 0 },
    run: reload,
    loading,
  } = useRequestDataSource(memoTransformOption, {
    onBefore: (params) => _.attempt(onBefore, params),
    onSuccess: (data, params) => _.attempt(onSuccess, data, params),
    defaultParams,
  });
  const { list: data, total } = resultData as { list: any; total: number };
  const selfRef = useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  const dataSourceResult = _.isEmpty(data) ? {} : { data };
  const sortChange = useCallback(
    ({ prop, order }) => reload({
        currentPage,
        pageSize,
        sort: getOrder(order) ? prop : undefined,
        order: getOrder(order),
      }),
    [currentPage, pageSize, reload, sort, order],
  );
  const pageChange = useCallback(
    _.wrap(onChange, (fn, currentPage, pageSize) => {
      emit('sync:state', 'currentPage', currentPage);
      emit('sync:state', 'pageSize', pageSize);
      _.attempt(fn, currentPage, pageSize);
      _.attempt(reload, { currentPage, pageSize });
    }),
    [reload, emit],
  );
  return {
    ref: selfRef,
    total,
    loading,
    defaultSort: {
      prop: sort,
      order: getOrder(order),
    },
    onSortChange: sortChange,
    pageProps: {
      ...pageProps,
      total,
      onChange: pageChange,
    },
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
            {...omit({ ...props, ...attrs }, ['style'])}
            style={_.pickBy(props.style, (value, key) => key?.startsWith('--'))}
            v-slots={slots}
          />
          <ElConfigProvider locale={zhCn}>
            {props.pagination && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <ElPagination {...props.pageProps} total={props.pageProps.total} />
              </div>
            )}
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

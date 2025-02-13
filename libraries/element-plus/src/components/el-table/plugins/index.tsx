import { watch, ref, toRefs } from 'vue';
import { ElPagination } from 'element-plus';
import _ from 'lodash';

import fp from 'lodash/fp';
import { $deletePropsList } from '@/plugins/constants';

import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

function useControllableValue(props, options, { useState }) {
  const [value, setValue] = useState('');
  const { valuePropsName, tigger = `onUpdate:${valuePropsName}`, onChange } = options;
  const isControlled = props.has(valuePropsName);
  // fp.attempt(onChange)
  const myChange = (...arg) => {
    _.attempt(onChange, arg);
    _.attempt(setValue, arg);
  };
  const [myValue, mySetValue] = isControlled ? [props.get(valuePropsName), props.get(tigger)] : [value, myChange];
  return [myValue, mySetValue, { [valuePropsName]: myValue, [tigger]: mySetValue }];
}
export function handleDataSource(props, { useState, useEffect, useMemo }) {
  const dataSource = props.get('dataSource');
  const pageProps = props.get('pageProps');
  const sorting = props.get('sorting');
  const { currentPage, pageSize, onChange } = pageProps;
  const { sort, order } = sorting ? { sort: sorting.field, order: sorting.order } : {};

  const onBefore = props.get('onBefore', () => {});
  const onSuccess = props.get('onSuccess', () => {});

  const ref = props.get('ref');

  const warpList = _.cond([
    [Array.isArray, (list) => ({ list, total: list.length })],
    [_.isPlainObject, (data) => data],
    [_.conforms({ list: _.isArray }), _.identity],
    [fp.stubTrue, fp.constant({ list: [], total: 0 })],
  ]) as (Target: { list: unknown }) => {
    list: any;
    total: number;
  };
  const getOrder = _.cond([
    [_.matches('descending'), _.constant('desc')],
    [_.matches('desc'), _.constant('descending')],
    [_.matches('ascending'), _.constant('asc')],
    [_.matches('asc'), _.constant('ascending')],
    [_.stubTrue, _.constant(undefined)],
  ]);
  const transformOption = useMemo(
    () => fp.cond([
      [fp.isArray, fp.constant(async () => ({ list: dataSource, total: dataSource.length }))],
      [_.isPlainObject, (data) => () => data],
      [fp.isFunction, fp.constant((...arg) => Promise.resolve(dataSource(...arg)).then(warpList))],
      [fp.stubTrue, fp.constant(async () => ({ list: [], total: 0 }))],
    ]),
    [dataSource],
  );
  const {
    data: resultData = { list: [], total: 0 },
    run: reload,
    loading,
  } = useRequestDataSource(
    transformOption(dataSource),
    {
      onBefore: (params) => _.attempt(onBefore, params),
      onSuccess: (data, params) => _.attempt(onSuccess, data, params),
      defaultParams: [
        {
          currentPage,
          pageSize,
          sort,
          order,
        },
      ],
    },
    { useState, useEffect, useMemo },
  );
  const { list: data, total } = resultData;
  const selfRef = useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  const dataSourceResult = _.isEmpty(data) ? {} : { data };

  return {
    ref: selfRef,
    loading,
    defaultSort: {
      prop: sort,
      order: getOrder(order),
    },
    onSortChange: ({ prop, order }) => reload({
      currentPage,
      pageSize,
      sort: getOrder(order) ? prop : undefined,
      order: getOrder(order),
    }),
    pageProps: {
      ...pageProps,
      total,
      onChange: _.wrap(onChange, (fn, currentPage, pageSize) => {
        _.attempt(fn, currentPage, pageSize);
        _.attempt(reload, { currentPage, pageSize });
      }),
    },
    ...dataSourceResult,
  };
}

export function handlePage(props, { useState, childrenRef }) {
  const Component = props.get('render');
  const pagination = props.get('pagination');
  const pageSizes = props.get('pageSizes');
  const showTotal = props.get('showTotal');
  const showJumper = props.get('showJumper');
  const ref = props.get('ref');
  console.log(Component, 'Component==');
  const [currentPage, setpage, currentPageProps] = useControllableValue(
    props,
    {
      valuePropsName: 'currentPage',
    },
    { useState },
  );
  const [pageSize, setPageSize, pageSizeProps] = useControllableValue(
    props,
    {
      valuePropsName: 'pageSize',
    },
    { useState },
  );
  const layout = `${showTotal ? 'total' : ''},prev, pager, next,${showJumper ? 'jumper' : ''},sizes,`;
  return {
    pageProps: {
      ...currentPageProps,
      ...pageSizeProps,
      pageSizes,
      layout,
    },
    ref,
    pagination,
    render: (props, { attrs, expose, slots }) => {
      return [
        <div>
          <Component ref={childrenRef} {...{ ...props, ...ref.attrs }} v-slots={slots} />
          {props.pagination && (
            <ElPagination {...props.pageProps} style={{ float: 'right', marginTop: '8px' }} total={50} />
          )}
        </div>,
      ];
    },
  };
}
handlePage.order = 3;

function handleSelection(props, {
  useState, childrenRef, ref, useEffect,
}) {
  const ond = props.get('onUpdate:selectedRowKeys');
  const selectedRowKeys = props.get('selectedRowKeys');
  // const [currentPage, setpage, currentPageProps] = useControllableValue(props, {
  //   valuePropsName: 'selectedRowKeys',
  //   onChange: (...arg) => {
  //     ref?.toggleRowSelection?.(arg, true);
  //   },
  // }, { useState });
  // _.attempt(ref?.toggleRowSelection, currentPage, true);
  console.log(selectedRowKeys, 'selectedRowKeys==');
  useEffect(() => {
    setTimeout(() => {
      console.log('=====log', ref?.toggleRowSelection);
      ref?.toggleRowSelection?.(selectedRowKeys, true);
    }, 3000);
  }, [selectedRowKeys]);

  return {
    onSelectionChange(el) {
      console.log(el, 'el===');
      // setTimeout(() => {
      //   ond(el);
      // }, 2000);
      // if (!_.isEmpty(el)) {
      // ond(el);
      // }
      //   setpage(el);
      // setTimeout(() => {

      //     ref?.toggleRowSelection?.(el);
      //     console.log(el);
      // }, 3000);
      //   // console.log(el, 'el==');
    },
  };
}

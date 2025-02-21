import { watch, ref, toRefs } from 'vue';
import { ElPagination, ElConfigProvider } from 'element-plus';

import _ from 'lodash';
// import zhCn from "element-plus/lib/locale/lang/zh-cn"
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import fp from 'lodash/fp';
import omit from 'lodash/omit';
import {
  useState, useEffect, useMemo, useRef,
} from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';

import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

export function handleHeight(props) {
  const height = props.get('height');
  const maxHeight = props.get('maxHeight');

  return {
    height: height === '' ? undefined : height,
    maxHeight: maxHeight === '' ? undefined : maxHeight,
  };
}

function useControllableValue(props, options) {
  const [value, setValue] = useState('');
  const { valuePropsName, tigger = `onUpdate:${valuePropsName}`, onChange } = options;
  const isControlled = props.get(valuePropsName);
  const myChange = (...arg) => {
    _.attempt(onChange, arg);
    _.attempt(setValue, arg);
  };
  const [myValue, mySetValue] = isControlled
    ? [props.get(valuePropsName), props.get(tigger, () => {})]
    : [value, myChange];
  return [myValue, mySetValue, { [valuePropsName]: myValue, [tigger]: mySetValue }];
}

export function handleDataSource(props) {
  const dataSource = props.get('dataSource');
  const pageProps = props.get('pageProps');
  const { currentPage, pageSize, onChange = () => {} } = pageProps;
  const sort = props.get('field');
  const order = props.get('order');

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
    {
      useState,
      useEffect,
      useMemo,
      useRef,
    },
  );
  const { list: data, total } = resultData;
  const selfRef = useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  const dataSourceResult = _.isEmpty(data) ? {} : { data };

  return {
    ref: selfRef,
    total,
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

export function handlePage(props, { childrenRef }) {
  const Component = props.get('render');
  const pagination = props.get('pagination');
  const pageSizes = props.get('pageSizes');
  const showTotal = props.get('showTotal');
  const showJumper = props.get('showJumper');
  const ref = props.get('ref');
  const nodepath = props.get('data-nodepath');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
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
  let pageSizeOptions: number[] = [];
  try {
    if (_.isString(pageSizes)) {
      const list = JSON.parse(pageSizes);
      pageSizeOptions = Array.isArray(list) ? list : [10, 20, 50];
    } else if (_.isArray(pageSizes)) {
      pageSizeOptions = pageSizes;
    }
  } catch (error) {
    pageSizeOptions = [10, 20, 50];
  }
  return {
    pageProps: {
      ...currentPageProps,
      ...pageSizeProps,
      pageSizes: pageSizeOptions,
      layout,
    },
    ref,
    [$deletePropsList]: deletePropsList,
    pagination,
    render: (props, { attrs, expose, slots }) => {
      return [
        <div data-nodepath={nodepath} style={props.style}>
          <Component
            ref={childrenRef}
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
handlePage.order = 3;

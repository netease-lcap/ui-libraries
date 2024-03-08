import React from 'react';
import fp from 'lodash/fp';
import _ from 'lodash';
import { useAntdTable, useControllableValue } from 'ahooks';
import classnames from 'classnames';
import { TableColumn } from '@/index';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';

export function useHandleTitle(props) {
  const title = props.get('title');
  return _.isNil(title) ? {} : { title: () => title };
}
export function useHandle(props) {
  const childrenProps = props.get('children');
  const childrenList = React.Children.toArray(childrenProps).filter(React.isValidElement);
  const children = _.isEmpty(childrenList) ? false : childrenList;
  const columns = props.get('columns');
  const result = React.useMemo(() => {
    const columnsChildren = fp.filter((item: Record<string, any>) => {
      return React.isValidElement(item) && item.type === TableColumn;
    });
    const omitColumnsProps = fp.map((item: Record<string, any>) => item.props);
    const childrenFlow = fp.flow(columnsChildren, omitColumnsProps);
    const warpColumns = fp.map((item: any) => {
      const { render } = item;
      return _.isFunction(render) ? _.assign({}, item, {
        render: (text, record, index) => _.attempt(render, { item: record, text, index }),
      }) : item;
    });
    const columnsCond = fp.cond([
      [fp.conforms({ columns: fp.isArray, children: fp.stubTrue }), fp.constant({ columns: warpColumns(columns) })],
      [fp.conforms({ children: fp.isArray }), fp.constant({ columns: warpColumns(childrenFlow(children as Array<any>)) })],
      [fp.stubTrue, fp.stubObject],
    ]);
    return columnsCond({ columns, children });
  }, [children, columns]);
  return result;
}

export function useHandleTransformOption(props) {
  const dataSource = props.get('dataSource');
  const pagination = props.get('pagination');
  const onBefore = props.get('onBefore', () => { });
  const onSuccess = props.get('onSuccess', () => { });
  const current = props.get('current', 1);
  const pageSizeProps = props.get('pageSize', 10);
  const refProps = props.get('ref');
  const warpList = _.cond([
    [Array.isArray, (list) => ({ list, total: list.length })],
    [_.conforms({ list: _.isArray }), _.identity],
    [fp.stubTrue, fp.constant({ list: [], total: 0 })],
  ]) as (Target: {
    list: unknown;
  }) => {
    list: any;
    total: number;
  };
  const transformOption = React.useMemo(
    () => fp.cond([
      [fp.isArray, fp.constant(async () => ({ list: dataSource, total: dataSource.length }))],
      [fp.isFunction, fp.constant((...arg) => Promise.resolve(dataSource(...arg)).then(warpList))],
      [fp.stubTrue, fp.constant(async () => ({ list: [], total: 0 }))],
    ]),
    [dataSource],
  );

  const { tableProps, run } = useAntdTable(transformOption(dataSource), {
    onBefore: (params) => _.attempt(onBefore, params),
    onSuccess: (data, params) => _.attempt(onSuccess, data, params),
    defaultParams: [
      { current, pageSize: pageSizeProps },
    ],
  });
  const { dataSource: data, pagination: { pageSize } } = tableProps;
  const ref = _.assign(refProps, { reload: run, data, pageSize });
  const resultTableProps = _.isEqual(pagination, false) ? _.assign(tableProps, { pagination: false }) : tableProps;
  return fp.isNil(dataSource) ? {} : _.assign(resultTableProps, ref);
}

export function useHandlePagination(props) {
  const pagination = props.get('pagination');
  const showSizeChanger = props.get('showSizeChanger');
  const pageSizeOptions = props.get('pageSizeOptions');
  const onChange = props.get('onPageonChange');
  const showTotal = props.get('showTotal');
  const showTotalText = fp.cond([
    [fp.isEqual(true), fp.constant((total) => `共 ${total} 条`)],
    [fp.stubTrue, fp.constant(() => '')],
  ])(showTotal);
  const showQuickJumper = props.get('showQuickJumper');
  const paginationConfig = {
    ...(fp.isPlainObject(pagination) ? pagination : {}),
    ...(_.filterUnderfinedValue({
      showSizeChanger,
      pageSizeOptions,
      showTotal: showTotalText,
      showQuickJumper,
      onChange: _.wrap(pagination.onChange, (fn, ...arg) => {
        _.attempt(fn, arg);
        _.attempt(onChange, arg);
      }),
    })),
  };
  const paginationProps = fp.cond([
    [fp.isEqual(false), fp.constant({ pagination: false })],
    [fp.stubTrue, fp.constant({ pagination: paginationConfig })],
  ])(pagination);
  return paginationProps;
}
useHandlePagination.order = 5;

export function useHandleRowSelection(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const rowSelection = props.get('rowSelection');
  const [selectedRowKeys, onChange] = useControllableValue(_.filterUnderfinedValue({
    value: valueProps,
    onChange: onChangeProps,
  }));
  const result = fp.cond([
    [fp.isEqual(false), fp.constant({})],
    [fp.stubTrue, fp.constant({ rowSelection: { type: 'checkbox', selectedRowKeys, onChange } })],
  ])(!!rowSelection);
  return result;
}

export function useHandleSticky(props) {
  const sticky = props.get('sticky');
  const stickyOffsetTop = props.get('stickyOffsetTop');
  const result = fp.cond([
    [fp.conforms({ sticky: fp.isEqual(true), stickyOffsetTop: fp.isInteger }), fp.constant({ sticky: { offsetHeader: stickyOffsetTop } })],
    [fp.conforms({ sticky: fp.isEqual(true), stickyOffsetTop: fp.stubTrue }), fp.constant({ sticky: true })],
    [fp.stubTrue, fp.constant({})],
  ])({ sticky, stickyOffsetTop });
  return result;
}
export function useHandleLoading(props) {
  const loading = props.get('loading');
  const loadingText = props.get('loadingText');
  const result = fp.cond([
    [fp.conforms({ loading: fp.isEqual(true), loadingText: fp.isString }), fp.constant({ loading: { tip: loadingText } })],
    [fp.stubTrue, fp.constant({})],
  ])({ loading, loadingText });
  return result;
}

export function useHandleEmptyText(props) {
  const emptyText = props.get('emptyText');
  const result = fp.cond([
    [fp.conforms({ emptyText: fp.isString }), fp.constant({ locale: { emptyText } })],
    [fp.stubTrue, fp.constant({})],
  ])({ emptyText });
  return result;
}

export function useHandleOnRow(props) {
  const onRowClick = props.get('onRowClick', () => { });
  const onRowDbClick = props.get('onDoubleClick', () => { });
  return {
    onRow: (record, index) => ({
      onClick: () => _.attempt(onRowClick, record, index),
      onDoubleClick: () => _.attempt(onRowDbClick, record, index),
    }),
  };
}

export function useHandleSorter(props) {
  const columnsProps = props.get('columns');
  const columns = React.useMemo(() => _.map(columnsProps, (item) => {
    const isSorter = fp.conforms({ sorter: fp.isEqual(true) });
    const handleAscend = (a, b) => a[item.dataIndex] > b[item.dataIndex];
    const handleDescend = (a, b) => a[item.dataIndex] < b[item.dataIndex];
    const handleSorter = fp.cond([
      [fp.matches({ defaultSortOrder: 'ascend' }), fp.constant({ ...item, sorter: handleAscend })],
      [fp.matches({ defaultSortOrder: 'descend' }), fp.constant({ ...item, sorter: handleDescend })],
      [fp.stubTrue, fp.constant(fp.constant({ ...item, sorter: handleAscend }))],
    ]);
    return fp.cond([[isSorter, handleSorter], [fp.stubTrue, fp.identity]])(item);
  }), [columnsProps]);
  const result = fp.cond([
    [fp.isNil, fp.stubObject],
    [fp.stubTrue, fp.constant({ columns })],
  ])(columnsProps);
  return result;
}
export function useHandleScroll(props) {
  const scrollX = props.get('scrollX');
  const scrollY = props.get('scrollY');
  const deletePropsList = props.get($deletePropsList).concat('scrollX', 'scrollY');
  const scrollTep = { x: scrollX, y: scrollY };
  const scroll = _.filterUnderfinedValue(scrollTep);
  const result = _.isEmpty(scroll) ? {} : { scroll };
  return {
    [$deletePropsList]: deletePropsList,
    ...result,
  };
}

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.table, className),
  };
}

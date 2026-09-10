import _ from 'lodash';
import { Fragment } from 'vue';
import { Cell } from 'vant';
import { useMemo, useControllableValue, useRef, useCallback } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { addClass } from '@/utils';

const formatListResult = _.cond([
  [Array.isArray, (list) => ({ list, total: list.length })],
  [_.conforms({ list: _.isArray }), (data) => ({ list: data.list, total: data.total ?? data.list.length })],
  [_.stubTrue, _.constant({ list: [], total: 0 })],
]);

export function handlePageState(props) {
  const emit = props.get('emit');
  const ref = props.get('ref');
  const [currentPage, setCurrentPage] = useControllableValue(props, {
    defaultValuePropName: 'defaultCurrentPage',
    defaultValue: 1,
    valuePropName: 'currentPage',
    onChange: (nextPage, extra = {}) => {
      emit('sync:state', 'currentPage', nextPage);
      _.attempt(ref?.reload, { currentPage: nextPage, ...extra });
    },
  });
  const [pageSize, setPageSize] = useControllableValue(props, {
    defaultValuePropName: 'defaultPageSize',
    defaultValue: 20,
    valuePropName: 'pageSize',
    onChange: (nextSize) => {
      emit('sync:state', 'pageSize', nextSize);
      setCurrentPage(1, { pageSize: nextSize });
    },
  });
  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  };
}

export function handleSelect(props) {
  const selection = props.get('selectionMode');
  const [value, setValue, valueProps] = useControllableValue(props);
  const classProps = props.get('class');
  const clearable = props.get('clearable');
  const className = useMemo(() => {
    return addClass(classProps, {
      selection: selection !== 'none',
    });
  }, [classProps, selection]);
  const clickFn = useCallback(
    (val) => {
      const isSelectedValue = _.includes(_.concat([], value), val);
      const newValue = _.match({ selection, clearable, isSelectedValue })
        .when(_.matches({ selection: 'single', clearable: true, isSelectedValue: true }), () => undefined)
        .when(_.matches({ selection: 'multiple', clearable: true, isSelectedValue: true }), () => _.without(value, val))
        .when(_.matches({ selection: 'single', isSelectedValue: false }), () => val)
        .when(_.matches({ selection: 'multiple', isSelectedValue: false }), () => _.concat(value, val).filter(Boolean))
        .otherwise(() => value);
      setValue(newValue);
    },
    [clearable, value, setValue, selection],
  );

  return {
    ...valueProps,
    class: className,
    value,
    setValue,
    clickFn,
  };
}

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField') || 'label';
  const valueField = props.get('valueField') || 'value';
  const currentPage = props.get('currentPage', 1);
  const pageSize = props.get('pageSize', 20);
  const pagination = props.get('pagination');
  const setCurrentPage = props.get('setCurrentPage');
  const isAutoMore = pagination === 'autoMore';
  const deletePropsList = props
    .get($deletePropsList)
    .concat($dataSourceDeleteField, ['formTagName'], 'data', 'setCurrentPage', 'setPageSize', 'pageSize', 'currentPage', 'pagination');
  const ref = props.get('ref');
  const currentPageRef = useRef(currentPage);
  const lastAppliedPageRef = useRef(0);
  const pageSizeRef = useRef(pageSize);
  pageSizeRef.value = pageSize;

  const { data: resultData, run, loading } = useRequestDataSource(dataConfig, {
    defaultParams: [{ currentPage, pageSize, pagination: isAutoMore }],
    onBefore: (params) => {
      if (_.isNumber(params?.currentPage)) {
        currentPageRef.value = params.currentPage;
      }
    },
    formatResult: (data, prev) => {
      const next = formatListResult(data);
      const nextList = _.isArray(next?.list) ? next.list : [];
      const total = next?.total ?? prev?.total ?? nextList.length;
      const page = currentPageRef.value;
      if (!isAutoMore || page <= 1) {
        lastAppliedPageRef.value = 1;
        return { list: nextList, total };
      }
      if (page <= lastAppliedPageRef.value) {
        return prev ?? { list: nextList, total };
      }
      lastAppliedPageRef.value = page;
      const prevList = _.isArray(_.get(prev, 'list')) ? prev.list : [];
      return {
        list: prevList.concat(nextList),
        total,
      };
    },
  });

  const reload = useCallback(
    (params = {}) => {
      const hasPage = _.has(params, 'currentPage');
      const nextPage = hasPage ? params.currentPage : 1;
      currentPageRef.value = nextPage;
      if (!hasPage && currentPage !== 1 && setCurrentPage) {
        setCurrentPage(1);
        return;
      }
      run({
        currentPage: nextPage,
        pageSize: pageSizeRef.value,
        pagination: isAutoMore,
        ...params,
      });
    },
    [run, isAutoMore, currentPage, setCurrentPage],
  );

  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(resultData) });
  const total = Number(_.get(resultData, 'total'));
  const finished = !isAutoMore || (!_.isNil(resultData) && Number.isFinite(total) && dataSource.length >= total);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    finished,
    data: dataSource,
  };
}

export function handleDataRender(props) {
  const currentPageRef = useRef(1);
  const data = props.get('data');
  const dataConfig = props.get('dataSource');
  const currentPage = props.get('currentPage', 1);
  currentPageRef.value = currentPage;
  const setCurrentPage = props.get('setCurrentPage');
  const pagination = props.get('pagination');
  const loading = props.get('loading');
  const slots = props.get('slots');
  const onClick = props.get('clickFn');
  const isCell = props.get('isCell');
  const onLoadProps = props.get('onLoad') ?? (() => {});
  const selection = props.get('selectionMode');
  const value = props.get('value');
  const setCurrentPageFn = useCallback(
    _.throttle(
      () => {
        setCurrentPage(currentPageRef.value + 1);
      },
      1500,
      {
        leading: false,
        trailing: true,
      },
    ),
    [],
  );
  const finished = props.get('finished');
  const onLoad = useCallback(() => {
    if (loading !== false || finished || pagination !== 'autoMore') return;
    if (_.isEmpty(data)) return;
    setCurrentPageFn();
    _.attempt(onLoadProps);
  }, [loading, finished, pagination, data]);

  const dataSourceSlots = _.match(dataConfig)
    .when(_.isNil, () => ({}))
    .otherwise(() => ({
      default: () => _.map(data, (item, index) => {
        const itemNode = slots?.item?.({ item, index });
        // 单元格模式：取消列数/均分宽度布局，仅用 Fragment 包裹 Cell
        if (isCell) {
          return (
            <Fragment key={_.get(item, 'value', index)}>
              <Cell>{{ title: () => itemNode }}</Cell>
            </Fragment>
          );
        }
        return (
          <div
            key={_.get(item, 'value', index)}
            onClick={() => onClick(_.get(item, 'value', item))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(_.get(item, 'value', item));
              }
            }}
            tabIndex={0}
            role="button"
            class={addClass('el-list-components__frag', {
              'is-selected': _.includes(_.concat([], value), _.get(item, 'value', item)),
              'is-selectable': selection && selection !== 'none',
            })}
          >
            {itemNode}
          </div>
        );
      }),
    }));
  return {
    slots: _.assign({}, slots, dataSourceSlots),
    onLoad,
    finishedText: props.get('finishedText') ?? '没有更多了',
  };
}
handleDataRender.order = 5;

export function handleColumn(props) {
  const isCell = props.get('isCell');
  const columnProps = props.get('column');
  const equalWidth = props.get('equalWidth');
  const rowGap = props.get('rowGap');
  const columnGap = props.get('columnGap');
  const classNameProps = props.get('class');
  const styleProps = props.get('style');

  // 单元格模式：取消列数、均分宽度联动布局
  const style = useMemo(() => {
    if (isCell) return styleProps;
    return _.assign({}, styleProps, {
      '--row-gap': `${rowGap || 0}px`,
      '--column-gap': `${columnGap || 0}px`,
      '--el-list-components-column': columnProps <= 0 ? 5 : columnProps,
    });
  }, [isCell, styleProps, rowGap, columnGap, columnProps]);

  const className = useMemo(() => {
    if (isCell) {
      return addClass(classNameProps, {
        'el-list-components-plus': true,
        'is-cell-mode': true,
      });
    }
    return addClass(classNameProps, {
      'el-list-components-plus': true,
      isEqualWidth: equalWidth,
      isColumn: columnProps > 0,
    });
  }, [isCell, classNameProps, equalWidth, columnProps]);

  return {
    style,
    class: className,
  };
}

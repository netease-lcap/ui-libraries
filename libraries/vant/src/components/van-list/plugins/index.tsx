import _ from 'lodash';
import { Cell } from 'vant';
import { useEffect, useMemo, useControllableValue, useRef, useCallback } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { addClass } from '@/utils';
// 格式化数据源结果

export function handlePageState(props) {
  const emit = props.get('emit');
  const ref = props.get('ref');
  const [currentPage, setCurrentPage, currentPageProps] = useControllableValue(props, {
    defaultValuePropName: 'defaultCurrentPage',
    defaultValue: 1,
    valuePropName: 'currentPage',
    onChange: (currentPage, pageSize = {}) => {
      emit('sync:state', 'currentPage', currentPage);
      _.attempt(ref?.reload, { currentPage });
    },
  });
  return {
    currentPage,
    setCurrentPage,
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
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data', 'setCurrentPage');
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data: dataSource,
  };
}

export function handleDataRender(props) {
  const data = props.get('data');
  const dataConfig = props.get('dataSource');
  const currentPage = props.get('currentPage', 1);
  const setCurrentPage = props.get('setCurrentPage');
  const pagination = props.get('pagination');
  const loading = props.get('loading');
  const slots = props.get('slots');
  const onClick = props.get('clickFn');
  const isCell = props.get('isCell');
  const onLoadProps = props.get('onLoad') ?? (() => { });
  const selection = props.get('selectionMode');
  const value = props.get('value');
  const setCurrentPageFn = useCallback(_.throttle(() => {
    setCurrentPage((currentPage = 1) => {
      return currentPage + 1;
    });
  }, 1500, {
    trailing: true,
  }), []);
  const onLoad = useCallback(() => {
    if (loading !== false || pagination === 'none') return;
    setCurrentPageFn();
    _.attempt(onLoadProps);
  }, [loading, pagination]);
  const cellWrap = isCell ? (node) => <Cell>{{ title: node }}</Cell> : (node) => node;
  const dataList = useRef(data);
  useEffect(() => {
    if (currentPage === 1) {
      dataList.value = data;
    } else {
      dataList.value[currentPage - 1] = data;
    }
  }, [data]);

  const dataSourceSlots = _.match(dataConfig).when(_.isNil, () => ({})).otherwise(() => ({
    default: () => _.map(dataList.value, (item, index) => (
      <div
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
        {cellWrap(slots?.item?.({ item, index }))}
      </div>
    )),
  }));
  return {
    slots: _.assign({}, slots, dataSourceSlots),
    onLoad,
  };
}
handleDataRender.order = 5;

export function handleColumn(props) {
  const columnProps = props.get('column');
  const equalWidth = props.get('equalWidth');
  const rowGap = props.get('rowGap');
  const columnGap = props.get('columnGap');
  const classNameProps = props.get('class');
  const styleProps = props.get('style');

  // 构建样式对象，只有当 column 大于 0 时才设置 CSS 变量
  const style = useMemo(
    () => _.assign({}, styleProps, {
      '--row-gap': `${rowGap || 0}px`,
      '--column-gap': `${columnGap || 0}px`,
      '--el-list-components-column': columnProps <= 0 ? 5 : columnProps,
    }),
    [styleProps, rowGap, columnGap, columnProps],
  );
  const className = useMemo(
    () => addClass(classNameProps, {
      'el-list-components-plus': true,
      isEqualWidth: equalWidth,
      isColumn: columnProps > 0,
    }),
    [classNameProps, equalWidth, columnProps],
  );
  return {
    style,
    class: className,
  };
}

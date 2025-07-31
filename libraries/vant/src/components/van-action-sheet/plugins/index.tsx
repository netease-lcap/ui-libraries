import _ from 'lodash';
import { useCallback, useControllableValue, useMemo } from '@/plugins/hooks';
import { $dataSourceDeleteField, $deletePropsList } from '@/plugins/constants';
import { useFormatDataSource, useHandleMapField, useRequestDataSource } from '@/plugins/common/dataSource';
// import { getPropsIcon } from '@/plugins/common/icon';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');

  const staticActions = props.get('actions');

  const nameField = props.get('nameField') || 'name';
  const subNameField = props.get('subNameField') || 'subName';
  const colorField = props.get('colorField') || 'color';
  const iconField = props.get('iconField') || 'icon';
  const loadingField = props.get('loadingField') || 'loading';
  const disabledField = props.get('disabledField') || 'disabled';
  const onCallBack = props.get('onCallBack', () => {});

  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  const dataSource2Actions = useMemo(() => {
    if (!dataSource || !Array.isArray(dataSource) || dataSource.length === 0) {
      return [];
    }
    return _.map(dataSource, (item) => ({
      name: item[nameField],
      subName: item[subNameField],
      color: item[colorField],
      icon: item[iconField],
      loading: item[loadingField],
      disabled: item[disabledField],
      callback: () => onCallBack(item),
    }));
  }, [dataSource, nameField, subNameField, colorField, iconField, loadingField, disabledField]);

  const actions = useMemo(() => {
    return dataSource.length > 0 ? dataSource2Actions : staticActions;
  }, [dataSource, dataSource2Actions, staticActions]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    actions,
  };
}

export function handleActionSheetRef(props) {
  const [, setShow, showProps] = useControllableValue(props, {
    valuePropName: 'show',
    defaultValue: false,
  });

  const ref = props.get('ref');
  const onBeforeClose = props.get('onBeforeClose', () => true);
  const beforeClose = useCallback(
    _.wrap(onBeforeClose, (fn, ...args) => _.attempt(fn, ...args)),
    [onBeforeClose],
  );

  return {
    ...showProps,
    ref: _.assign({}, ref, {
      open: () => setShow(true),
      close: () => setShow(false),
    }),
    beforeClose,
  };
}

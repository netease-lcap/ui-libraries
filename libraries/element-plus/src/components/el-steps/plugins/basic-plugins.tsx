/* eslint-disable no-shadow */
import _ from 'lodash';
import { useMemo, useCallback, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

const STEP_NAME_PREFIX = '__STEP__';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const nameField = props.get('nameField') || 'value';
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  // 如果没有设数据源，从el-step里收集,否则从数据源里取
  const defaultNodes = slots?.default?.();
  const names = _.isNil(dataConfig)
    ? _(defaultNodes)
        .filter((node) => node?.type?.name.match(/[sS]tep$/))
        .map((node, index) => _.get(node, 'props.name', `${STEP_NAME_PREFIX}${index}`))
        .value()
    : _.map(dataSource, (item) => item[nameField]);

  const dataSourceSlots = useMemo(() => {
    return _.isNil(dataConfig)
    ? {}
    : {
      default: () => _.map(dataSource, (item) => {
        return (
          <el-step
            {...item}
            v-slots={{
              // 把从el-tabs中收集到的slots数据传递给el-tab-pane的插槽
              title: () => slots?.title?.({ item }),
              description: () => slots?.description?.({ item }),
            }}
          />
        );
      }),
    };
  }, [dataSource, dataConfig, slots]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
    names,
  };
}

export function handleSwitchStep(props) {
  const ref = props.get('ref');
  const names = props.get('names');
  const [value, setValue] = useControllableValue(props);
  const [activeProps, setActiveProps] = useControllableValue(props, {
    valuePropName: 'active',
    defaultValue: undefined,
  });

  const valueIndex = useMemo(() => (_.indexOf(names, value) === -1 ? 0 : _.indexOf(names, value) + 1), [names, value]);
  const activeSelf = useMemo(() => (_.isNil(activeProps) ? valueIndex : activeProps), [activeProps, valueIndex]);
  const onChange = useMemo(() => (_.isNil(activeProps) ? setValue : setActiveProps), [activeProps, setValue, setActiveProps]);

  const updateStep = useCallback((step: number) => {
    if (step < 0 || step > names.length) return;
    // 根据是否有 activeProps 决定使用索引还是名称
    const newValue = _.isNil(activeProps) ? names[step - 1] : step;
    onChange(newValue);
  }, [activeProps, names, onChange]);

  const prevStep = () => {
    updateStep(activeSelf - 1);
  };

  const nextStep = () => {
    updateStep(activeSelf + 1);
  };

  const selfRef = useMemo(() => _.assign(ref, {
    prev: prevStep,
    next: nextStep,
  }), [prevStep, nextStep]);

  return {
    active: activeSelf,
    ref: selfRef,
  };
}

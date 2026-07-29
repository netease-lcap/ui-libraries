/* eslint-disable no-shadow */
import _ from 'lodash';
import { useMemo, useControllableValue, useEffect } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { VanStep } from '../index';

const STEP_NAME_PREFIX = '__STEP__';

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const valueField = props.get('valueField') || 'value';
  const slotsProps = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig);
  const dataSource = useHandleMapField({ dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const slotsDefaultValues = useMemo(() => {
    const isStepItem = (node) => _.get(node, 'type.components.Component.name', '').match('van-step');
    const defaultNodes = _.attempt(slotsProps.default) ?? [];
    return _.flatMap(defaultNodes, (node, index) => (isStepItem(node) ? [_.get(node, 'props.value', `${STEP_NAME_PREFIX}${index}`)] : []));
  }, [slotsProps]);

  const dataSourceValues = useMemo(() => _.map(dataSource, (item) => item[valueField]), [dataSource, valueField]);

  const stepValueList = useMemo(
    () => (_.isNil(dataConfig) ? slotsDefaultValues : dataSourceValues),
    [dataConfig, dataSourceValues, slotsDefaultValues],
  );

  const dataSourceSlots = useMemo(() => {
    return _.isNil(dataConfig)
      ? {}
      : {
        default: () => _.map(dataSource, (item) => (
          <VanStep
            {...item}
            v-slots={{
              default: () => slotsProps?.content?.({ item }),
            }}
          />
          )),
        };
  }, [dataSource, dataConfig, slotsProps]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slotsProps, dataSourceSlots),
    stepValueList,
  };
}

export function handleSwitchStep(props) {
  const ref = props.get('ref');
  const stepValueList = props.get('stepValueList');
  const [active, setActive] = useControllableValue(props, {
    valuePropName: 'active',
    defaultValue: 0,
  });

  const [value, setValue] = useControllableValue(props, {
    defaultValue: stepValueList[0],
  });

  useEffect(() => {
    const index = _.indexOf(stepValueList, value);
    const activeValue = index === -1 ? 0 : index;
    setActive(activeValue);
  }, [value, stepValueList]);

  const prevStep = () => {
    const nextValueIndex = Math.max(0, _.indexOf(stepValueList, value) - 1);
    setValue(stepValueList[nextValueIndex]);
  };

  const nextStep = () => {
    const nextValueIndex = Math.min(stepValueList.length - 1, _.indexOf(stepValueList, value) + 1);
    setValue(stepValueList[nextValueIndex]);
  };

  const selfRef = useMemo(
    () => _.assign(ref, {
      prev: prevStep,
      next: nextStep,
    }),
    [prevStep, nextStep],
  );

  return {
    active,
    ref: selfRef,
  };
}

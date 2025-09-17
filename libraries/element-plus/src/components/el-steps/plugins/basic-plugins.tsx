/* eslint-disable no-shadow */
import _ from 'lodash';
import { StepsProps } from 'element-plus';
import { useMemo, useControllableValue, useEffect } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { ElStep } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const STEP_NAME_PREFIX = '__STEP__';
const StepsAccumulate = new PluginAccumulateTypes<nasl.ui.ElStepsOptions<any, any>, StepsProps>();

export default StepsAccumulate.addPlugin({
  name: 'handleDataSource',
  handle(props) {
    const dataConfig = props.get('dataSource');
    const nameField = props.get('nameField') || 'value';
    const slotsProps = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
    const ref = props.get('ref');
    const { data, run: reload, loading } = useRequestDataSource(dataConfig);
    const dataSource = useHandleMapField({ dataSource: useFormatDataSource(data) });
    const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
    const slotsDefaultNames = useMemo(() => {
      const isStepItem = (node) => _.get(node, 'type.components.Component.name', '').match('ElStep');
      const defaultNodes = _.attempt(slotsProps.default) ?? [];
      return _.flatMap(defaultNodes, (node, index) => (isStepItem(node) ? [_.get(node, 'props.name', `${STEP_NAME_PREFIX}${index}`)] : []));
    }, [slotsProps]);

    const dataSourceNames = useMemo(() => _.map(dataSource, (item) => item[nameField]), [dataSource, nameField]);

    const stepNameList = useMemo(
      () => (_.isNil(dataConfig) ? slotsDefaultNames : dataSourceNames),
      [dataConfig, dataSourceNames, slotsDefaultNames],
    );

    const dataSourceSlots = useMemo(() => {
      return _.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => (
              <ElStep
                {...item}
                v-slots={{
                    // 把从el-tabs中收集到的slots数据传递给el-tab-pane的插槽
                    title: () => slotsProps?.title?.({ item } as any),
                    description: () => slotsProps?.description?.({ item } as any),
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
      stepNameList,
    };
  },
}).addPlugin({
  name: 'handleSwitchStep',
  handle(props) {
    const ref = props.get('ref');
    const stepNameList = props.get('stepNameList');
    const [active, setActive] = useControllableValue(props, {
      valuePropName: 'active',
      defaultValue: 0,
    });
    const [name, setName] = useControllableValue(props, {
      defaultValue: stepNameList[0],
    });

    useEffect(() => {
      const index = _.indexOf(stepNameList, name);
      const activeValue = index === -1 ? 0 : index + 1;
      setActive(activeValue);
    }, [name, stepNameList]);

    const prevStep = () => {
      const nextNameIndex = Math.max(0, _.indexOf(stepNameList, name) - 1);
      setName(stepNameList[nextNameIndex]);
    };

    const nextStep = () => {
      const nextNameIndex = Math.min(stepNameList.length - 1, _.indexOf(stepNameList, name) + 1);
      setName(stepNameList[nextNameIndex]);
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
  },
});

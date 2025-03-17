/* eslint-disable no-shadow */
import _ from 'lodash';
import { useEffect, useMemo, useState, useCallback } from '@/plugins/hooks';
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

  const [namesState, setNamesState] = useState([]);

  const names: string[] = [];

  // 如果没有设数据源，从el-step里收集
  if (_.isNil(dataConfig)) {
    const defaultNodes = slots?.default?.();
    let index = 0;
    defaultNodes.forEach((node) => {
      if (!node?.type?.name?.endsWith('step') && !node?.type?.name?.endsWith('Step')) {
        return;
      }
      const nodeProps = node.props;
      // el-step里别名属性名是name，取name
      if (nodeProps.name) {
        names.push(nodeProps.name);
      } else {
        names.push(`${STEP_NAME_PREFIX}${index++}`);
      }
    });
    setNamesState(names);
  }

  const dataSourceSlots = _.isNil(dataConfig)
  ? {}
  : {
      default: () => _.map(dataSource, (item, index) => {
        const name = item[nameField];
        names.push(name);
        if (index === dataSource.length - 1) {
          setNamesState(names);
        }
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

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
    slots: _.assign(slots, dataSourceSlots),
    names: namesState,
  };
}

export function handleSwitchStep(props) {
  const ref = props.get('ref');
  const names = props.get('names');
  const active = props.get('active');
  const [activeState, setActiveState] = useState(0);
  useEffect(() => {
    const activeV = _.cond([
      [_.isNil, () => 0],
      [_.isNumber, (v) => v],
      [_.stubTrue, (v) => {
        const activeIndex = _.indexOf(names, v);
        return activeIndex === -1 ? 0 : activeIndex + 1;
      }],
    ])(active);
    // TODO LD:这里为什么只在第一次names发生变化的时候才会更新到activeState
    console.log('😕activeV更新', activeV);
    setActiveState(activeV);
  }, [names, active]);
  console.log('😰', activeState);

  useEffect(() => {
    console.log('🧤activeState变化', activeState);
  }, [activeState]);

  // const updateSyncActive = () => {
  //   let value = names[activeState];
  //   if (_.isNil(value) || (typeof value === 'string' && value.startsWith('__STEP__'))) {
  //     value = activeState;
  //   }

  //   const onUpdateValue = props.get('update:active');
  //   const onChange = props.get('onChange');
  //   if (typeof onUpdateValue === 'function') {
  //     onUpdateValue(value);
  //   }
  //   if (typeof onChange === 'function') {
  //     onChange(value);
  //   }
  // };

  // 更新步骤方法
  const prevStep = useCallback(() => {
    if (activeState === 0) return;
    setActiveState(activeState - 1);
    // updateSyncActive();
  }, [activeState]);

  const nextStep = useCallback(() => {
    if (names.length === activeState) return;
    setActiveState(activeState + 1);
    // updateSyncActive();
  }, [activeState, names]);

  const selfRef = useMemo(() => _.assign(ref, {
    prev: prevStep,
    next: nextStep,
  }), [prevStep, nextStep]);

  return {
    active: activeState,
    ref: selfRef,
  };
}

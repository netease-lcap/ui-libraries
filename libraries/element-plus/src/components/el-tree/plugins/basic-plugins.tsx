import _ from 'lodash';
import { ElTreeV2, TreeOptionProps } from 'element-plus';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useMemo, useCallback, useControllableValue } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const ElTreeBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTreeOptions<any, any, any>, TreeOptionProps>();
export default ElTreeBasicAccumulate.addPlugin({
  name: 'handleDataSource',
  handle(props) {
    const dataConfig = props.get('dataSource');
    const textField = props.get('textField', 'label');
    const valueField = props.get('valueField', 'value');
    const parentField = props.get('parentField');
    const slotsProps = props.get('slots');
    const deletePropsList = props
      .get($deletePropsList)
      .concat(['textField', 'valueField', 'parentField', 'childrenField']);
    const ref = props.get('ref');
    const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
    const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
    const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
    const selfRef = useMemo(() => _.assign({}, ref, { reload, data: TreeData }), [TreeData, reload, ref]);
    const dataSourceResult = _.isEmpty(TreeData) ? {} : { data: TreeData };
    const slotItemToDefault = useMemo(() => {
      const hasItemSlot = _.isFunction(slotsProps?.item);
      return hasItemSlot ? { default: ({ node }) => slotsProps.item({ item: node } as any) } : {};
    }, [slotsProps.item]);
    const slots = _.assign(slotsProps, { ...slotItemToDefault });

    return {
      [$deletePropsList]: deletePropsList,
      ref: selfRef,
      nodeKey: 'value',
      loading,
      ...dataSourceResult,
      slots,
    };
  },
})
  .addPlugin({
    name: 'handleVirtualize',
    handle(props) {
      const virtualize = props.get('virtualize');
      const slots = props.get('slots');

      const render = useCallback((props) => <ElTreeV2 {...props} v-slots={slots} />, [slots]);
      const result = useMemo(() => {
        return virtualize
          ? {
              render,
            }
          : {};
      }, [virtualize, render]);
      return result;
    },
  })
  .addPlugin({
    name: 'handleControllableValue',
    handle(props) {
      const ref = props.get('ref');
      const showCheckbox = props.get('showCheckbox');
      const onNodeClick = props.get('onNodeClick');
      const onCheck = props.get('onCheck');
      const [value, setValue] = useControllableValue(props, {
        onValueEffect: (currentValue) => {
          const emitEvent = showCheckbox ? ref.setCheckedKeys : ref.setCurrentKey;
          _.attempt(emitEvent, currentValue);
        },
      });

      return {
        onNodeClick: _.wrap(onNodeClick, (fn, ...args) => {
          _.attempt(fn, ...args);
          if (!showCheckbox) {
            setValue(_.get(args, '0.value'));
          }
        }),
        onCheck: _.wrap(onCheck, (fn, node, checked) => {
          _.attempt(fn, node, checked);
          if (showCheckbox) {
            setValue(_.get(checked, 'checkedKeys', []));
          }
        }),
      };
    },
  });

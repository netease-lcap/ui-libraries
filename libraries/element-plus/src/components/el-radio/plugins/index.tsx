/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElRadio, ElRadioButton, RadioGroupProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo, useCallback, useSyncState } from '@/plugins/hooks';
import { getIsPreview } from '@/plugins/common/preview';
import idePlugin from './ide';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
// import { ElText } from '@/index';
import { addClass } from '@/utils';

const RadioAccumulate = new PluginAccumulateTypes<nasl.ui.ElRadioGroupOptions<any, any>, RadioGroupProps>();

export default RadioAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle() {
      return {
        formTagName: 'el-form-radio-group',
        tagName: 'el-radio-group',
      };
    },
  })
  .addPlugin({
    name: 'handleComponentInForm',
    handle: handleComponentInForm,
  })
  .addPlugin({
    name: 'handleControllableValue',
    handle: handleControllableValue,
  })
  .addPlugin({
    name: 'handleDataSource',
    handle(props) {
      const dataConfig = props.get('dataSource');
      const textField = props.get('textField', 'label');
      const valueField = props.get('valueField', 'value');
      const slots = props.get('slots');
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
      const ref = props.get('ref');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
      const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
      const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
      const dataSourceSlots = useMemo(
        () => (_.isNil(dataConfig)
          ? {}
          : {
            default: () => _.map(dataSource, (item) => (
              <ElRadio {...item}>
                {slots.item ? slots.item({ item: item?.itemSource ?? item } as any) : item.label}
              </ElRadio>
            )),
          }),
        [dataSource, slots, dataConfig],
      );

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        data,
        slots: _.assign(slots, dataSourceSlots),
      };
    },
  })
  .addPlugin({
    name: 'handleItemType',
    handle(props) {
      const type = props.get('type');
      const slots = props.get('slots');
      const condToDefaultRender = _.cond([
        [
          _.matches('button'),
          _.constant(
            _.map(slots.default?.(), (node: any) => (
              <ElRadioButton {..._.omit(node.props, 'ref')} v-slots={node.children} />
            )),
          ),
        ],
        [
          _.matches('border'),
          _.constant(
            _.map(slots.default?.(), (node: any) => (
              <ElRadio {..._.omit(node.props, 'ref')} v-slots={node.children} border />
            )),
          ),
        ],
        [_.stubTrue, slots.default],
      ]);
      const defaultRender = useCallback(() => condToDefaultRender(type), [type, slots.default]);
      return {
        slots: _.assign(slots, { default: defaultRender }),
      };
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const className = props.get('class');
      const isPreview = getIsPreview(props);
      if (!isPreview) return {};
      return {
        direction: 'horizontal',
        disabled: true,
        type: 'default',
        class: addClass(className, 'el-radio-group-preview'),
      };
    },
  })
  .addPlugin({
    name: 'handleDirection',
    handle(props) {
      const direction = props.get('direction');
      const className = props.get('class');
      const column = props.get('column');
      const style = props.get('style');
      return {
        class: addClass(className, { 'el-radio-group-vertical': direction === 'vertical', 'cw-radio-group': true }),
        style: {
          ...style,
          'grid-template-columns': column ? `repeat(${column}, 1fr)` : 'auto-fill',
          'grid-auto-flow': column ? 'row' : 'auto',
        },
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      const emit = props.get('emit');
      const data = props.get('data');
      emit('sync:state', 'data', data);
      useSyncState(props, 'disabled');
      useSyncState(props, 'preview');
      return {};
    },
  });

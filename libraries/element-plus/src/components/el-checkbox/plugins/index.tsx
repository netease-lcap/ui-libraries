/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElCheckbox, ElCheckboxButton, CheckboxGroupProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo, useCallback } from '@/plugins/hooks';
import { getIsPreview, getRender, getListPreviewText } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { addClass } from '@/utils';

const CheckboxAccumulate = new PluginAccumulateTypes<nasl.ui.ElCheckboxGroupOptions<any, any>, CheckboxGroupProps>();

export default CheckboxAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle: () => {
      return {
        formTagName: 'el-form-checkbox-group',
        tagName: 'el-checkbox-group',
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
    handle: (props) => {
      const dataConfig = props.get('dataSource');
      const valueField = props.get('valueField', 'value');
      const slots = props.get('slots');
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
      const ref = props.get('ref');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});

      const dataSource = useHandleMapField({ valueField, dataSource: useFormatDataSource(data) });
      const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
      const dataSourceSlots = useMemo(
        () => (_.isNil(dataConfig)
            ? {}
            : {
                default: () => _.map(dataSource, (item) => (
                  <ElCheckbox {...item}>{slots.item ? slots.item({ item } as any) : item.label}</ElCheckbox>
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
    handle: (props) => {
      const type = props.get('type');
      const slots = props.get('slots');
      const condToDefaultRender = _.cond([
        [
          _.matches('button'),
          _.constant(
            _.map(slots.default?.(), (node: any) => <ElCheckboxButton {...node.props} v-slots={node.children} />),
          ),
        ],
        [
          _.matches('border'),
          _.constant(
            _.map(slots.default?.(), (node: any) => <ElCheckbox {...node.props} v-slots={node.children} border />),
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
    handle: (props) => {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const valueField = props.get('valueField', 'value');
        const value = getListPreviewText('label', valueField, insProps.data, insProps.modelValue);
        const previewText = inIDE ? '-' : value;
        return <ElPreview text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);
      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      };
    },
  })
  .addPlugin({
    name: 'handleDirection',
    handle: (props) => {
      const direction = props.get('direction');
      const className = props.get('class');
      const column = props.get('column');
      const style = props.get('style');
      return {
        class: addClass(className, { 'el-checkbox-group-vertical': direction === 'vertical' }),
        style: {
          ...style,
          'grid-template-columns': column ? `repeat(${column}, 1fr)` : 'auto-fill',
          'grid-auto-flow': column ? 'row' : 'auto',
        },
      };
    },
  });

/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElSelectV2, SelectProps } from 'element-plus';
import { useMemo, useCallback } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { ElOption } from '../index';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { IIdePluginBase } from '@/types';

const SelectBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElSelectOptions<any, any, any, any, any>,
  typeof SelectProps & IIdePluginBase
>();
export default SelectBasicAccumulate.addPlugin({
  name: 'handleTagName',
  handle() {
    return {
      formTagName: 'el-form-select',
      tagName: 'el-select',
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
      const textField = props.get('textField') || 'label';
      const valueField = props.get('valueField') || 'value';
      const descriptionField = props.get('descriptionField') || 'description';
      const slots = props.get('slots');
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
      const ref = props.get('ref');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig);
      const dataSource = useHandleMapField({
        textField,
        valueField,
        dataSource: useFormatDataSource(data),
        fieldsMap: {
          description: descriptionField,
        },
      });
      const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
      const dataSourceSlots = _.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(dataSource, (item) => (
              <ElOption {...item}>
                {item.label}
                {item.description && (
                <el-text
                  style="display:block;height:14px;line-height:14px"
                  color="secondary"
                  text={item.description}
                />
                  )}
              </ElOption>
              )),
          };

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        slots: _.assign(slots, dataSourceSlots),
        data: dataSource,
      };
    },
  })
  .addPlugin({
    name: 'handleValueNotInData',
    handle(props) {
      const selectedValuesData = props.get('selectedValuesData');
      const data = props.get('data', []);
      if (_.isEmpty(selectedValuesData) || _.isEmpty(data)) return {};
      return {
        data: _.unionBy(data, selectedValuesData, 'value'),
      };
    },
  })
  .addPlugin({
    name: 'handleVirtualize',
    handle(props) {
      const slots = props.get('slots');
      const virtualize = props.get('virtualize');
      const data = props.get('data') ?? [];
      const render = useCallback((props) => <ElSelectV2 {...props} />, []);
      const result = useMemo(() => {
        return virtualize
          ? {
              options: data,
              render,
              slots: _.omit(slots, 'default'),
            }
          : {};
      }, [virtualize, data, render]);
      return result;
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);
      const data = props.get('data');
      const modelValue = props.get('modelValue');
      const valueList = _.isArray(modelValue) ? modelValue : [modelValue];
      const previewText = _.join(
        _.map(valueList, (item) => _.get(_.find(data, { value: item }), 'label', '')),
        ',',
      );

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const previewText = inIDE || _.isEmpty(insProps.previewText) ? '-' : insProps.previewText;
        return <ElPreview text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
        previewText,
      };
    },
  });

/* 组件功能扩展插件 */

import _ from 'lodash';
import { TransferProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo, useSyncState } from '@/plugins/hooks';
import { getIsPreview, getRender, getListPreviewText } from '@/plugins/common/preview';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import IdePlugin from './ide';

const ElTransferBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTransferOptions<any, any>, TransferProps>();
export default ElTransferBasicAccumulate.addAccumulate(IdePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle(props) {
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        formTagName: 'el-form-transfer',
        tagName: 'el-transfer',
        [$deletePropsList]: deletePropsList,
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
    name: 'handleTitle',
    handle(props) {
      const leftTitle = props.get('leftTitle');
      const rightTitle = props.get('rightTitle');
      const titles = [leftTitle, rightTitle];
      return {
        titles,
      };
    },
  })
  .addPlugin({
    name: 'handleButtonText',
    handle(props) {
      const leftButtonText = props.get('leftButtonText');
      const rightButtonText = props.get('rightButtonText');
      return {
        buttonTexts: [leftButtonText, rightButtonText],
      };
    },
  })
  .addPlugin({
    name: 'handleDataSource',
    handle(props) {
      const dataConfig = props.get('dataSource');
      const textField = props.get('textField') || 'label';
      const valueField = props.get('valueField') || 'value';
      const disabledField = props.get('disabledField') || 'disabled';
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName']);
      const ref = props.get('ref');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig);
      const dataSource = useHandleMapField({
        value: 'key',
        textField,
        valueField,
        dataSource: useFormatDataSource(data),
        fieldsMap: {
          disabled: disabledField,
        },
      });
      const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        data: dataSource,
      };
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const textField = props.get('textField', 'label');
        const valueField = props.get('valueField', 'value');
        const value = getListPreviewText(textField, valueField, insProps.data, insProps.modelValue);
        const previewText = inIDE ? '-' : value;
        return <el-text text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);
      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
        preview: isPreview,
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      useSyncState(props, 'preview');
      return {};
    },
  });

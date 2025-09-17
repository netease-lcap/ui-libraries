/* 组件功能扩展插件 */
import _ from 'lodash';
import { MentionProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import IdePlugin from './ide';

import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';

const MentionBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElMentionOptions<any, any>, MentionProps>();
export default MentionBasicAccumulate.addAccumulate(IdePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle() {
      return {
        formTagName: 'el-form-mention',
        tagName: 'el-mention',
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
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName']);
      const ref = props.get('ref');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig);
      const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
      const selfRef = useMemo(() => _.assign(ref, { reload, options: dataSource }), [dataSource, reload, ref]);
      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        options: dataSource,
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
        const value = (insProps.modelValue ?? '').split(' ').filter(Boolean).join(', ');
        const previewText = inIDE || _.isEmpty(value) ? '-' : value;
        return <ElPreview text={previewText} />;
      };
      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      };
    },
  });

import _ from 'lodash';
import { SwitchProps } from 'element-plus';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElText } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { useEffect } from '@/plugins/hooks';
import idePlugin from './ide';
import { $deletePropsList } from '@/plugins/constants';

const SwitchAccumulate = new PluginAccumulateTypes<nasl.ui.ElSwitchOptions, SwitchProps>();
export default SwitchAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle(props) {
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        formTagName: 'el-form-switch',
        tagName: 'el-switch',
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
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        let previewText = '-';
        if (!inIDE) {
          previewText = insProps.modelValue ? '已开启' : '已关闭';
        }
        return <ElText text={previewText} />;
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
      const emit = props.get('emit');
      const disabled = props.get('disabled');
      const preview = props.get('preview');
      useEffect(() => {
        emit('sync:state', 'disabled', disabled);
        emit('sync:state', 'preview', preview);
      }, [disabled, preview]);
      return {};
    },
  });

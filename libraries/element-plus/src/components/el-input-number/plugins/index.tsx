import _ from 'lodash';
import { InputNumberProps } from 'element-plus';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElText } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { useSyncState } from '@/plugins/hooks';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { $deletePropsList } from '@/plugins/constants';

const InputNumberBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElInputNumberOptions, InputNumberProps>();

export default InputNumberBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleDefaultPrps',
    handle(props) {
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        formTagName: 'el-form-input-number',
        tagName: 'el-input-number',
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
        const previewText = inIDE || _.isNil(insProps.modelValue) ? '-' : insProps.modelValue;
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
    name: 'handlePrefixAndSuffix',
    handle(props) {
      const slots = props.get('slots');
      const prefix = props.get('prefix');
      const suffix = props.get('suffix');
      return {
        slots: _.assign({}, slots, {
          prefix: () => [prefix],
          suffix: () => [suffix],
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      useSyncState(props, 'disabled');
      useSyncState(props, 'preview');
      useSyncState(props, 'readonly');
      return {};
    },
  });

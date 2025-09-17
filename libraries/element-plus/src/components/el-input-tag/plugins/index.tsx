import _ from 'lodash';
import { InputTagProps } from 'element-plus';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { $deletePropsList } from '@/plugins/constants';

const InputTagBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElInputTagOptions, InputTagProps>();
export default InputTagBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleDefaultPrps',
    handle(props) {
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        formTagName: 'el-form-input-tag',
        tagName: 'el-input-tag',
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
        const value = (insProps.modelValue || []).join(', ');
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

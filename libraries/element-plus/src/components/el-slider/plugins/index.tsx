import _ from 'lodash';
import { SliderProps } from 'element-plus';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElText } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { $deletePropsList } from '@/plugins/constants';
const SliderAccumulate = new PluginAccumulateTypes<nasl.ui.ElSliderOptions, SliderProps>();
export default SliderAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle(props) {
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        formTagName: 'el-form-slider',
        tagName: 'el-slider',
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
    name: 'handleHeight',
    handle(props) {
      const heightProps = props.get('height');
      const height = _.isNumber(heightProps) ? `${heightProps}px` : '';
      return { height };
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
        const previewText = inIDE || _.isNil(insProps.modelValue) ? '-' : insProps.modelValue;
        return <ElText text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);
      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      };
    },
  });

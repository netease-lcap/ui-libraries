import _ from 'lodash';
import { RateProps } from 'element-plus';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { ElText } from '@/index';

import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';


const RateAccumulate = new PluginAccumulateTypes<nasl.ui.ElRateOptions, RateProps>();
export default RateAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle(props, context) {
      return {
        formTagName: 'el-form-rate',
        tagName: 'el-rate',
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
    name: 'handleColor',
    handle(props) {
      const lowColor = props.get('lowColor', '#F7BA2A');
      const mediumColor = props.get('mediumColor', '#F7BA2A');
      const highColor = props.get('highColor', '#F7BA2A');
      const colorsProps = props.get('colors');
      const colors = _.isArray(colorsProps) ? colorsProps : [lowColor, mediumColor, highColor];
      return {
        colors,
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
        const previewText = inIDE || _.isNil(insProps.modelValue) ? '-' : insProps.modelValue;
        return <ElText text={previewText} />;
      };
      const { render, insRef } = getRender(Component, previewRender, isPreview);
      return isPreview
        ? {
            ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
            render,
          }
        : {};
    },
  });

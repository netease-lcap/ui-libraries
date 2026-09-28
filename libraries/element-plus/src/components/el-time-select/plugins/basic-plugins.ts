import { TimeSelectProps } from 'element-plus';
import { getPropsIcon } from '@/plugins/common/icon';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

import { $deletePropsList } from '@/plugins/constants';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';

const TimeSelectBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTimeSelectOptions, TimeSelectProps>();
export default TimeSelectBasicAccumulate.addPlugin({
  name: 'handleTagName',
  handle(props) {
    const className = props.get('class') ?? '';
    return {
      formTagName: 'el-form-time-select',
      tagName: 'el-time-select',
      class: `${className} el-time-select`,
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
    name: 'handleIcon',
    handle(props) {
      const prefixIconName = props.get('prefixIconName');
      return {
        prefixIcon: getPropsIcon({ name: prefixIconName }),
      };
    },
  });

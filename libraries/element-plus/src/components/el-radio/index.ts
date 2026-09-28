import { ElRadio, ElRadioGroup as ElRadioGroupPlus, ElRadioButton as ElRadioButtonPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import { $deletePropsList } from '@/plugins/constants';
import basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';
import './index.less';

function ElRadioGroupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElRadioGroup = registerComponent(ElRadioGroupPlus, { plugin: basicsPlugin, name: 'el-radio-group' });
const ElFormRadioGroup = withFormItem(ElRadioGroup, 'el-form-radio-group');

export { ElRadio, ElRadioGroupPlus, ElRadioGroup, ElFormRadioGroup, ElRadioGroupRegister, ElRadioButtonPlus };
export const ElRadioBasicsPlugin = basicsPlugin;
export default ElRadioGroup;

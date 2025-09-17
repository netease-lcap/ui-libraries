import { ElCheckbox, ElCheckboxGroup as ElCheckboxGroupPlus, ElCheckboxButton } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

function ElCheckboxRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCheckboxGroup = registerComponent(ElCheckboxGroupPlus, { plugin: basicsPlugin, name: 'el-checkbox-group' });
const ElFormCheckboxGroup = withFormItem(ElCheckboxGroup, 'el-form-checkbox-group');

export { ElCheckbox, ElCheckboxGroupPlus, ElCheckboxGroup, ElFormCheckboxGroup, ElCheckboxRegister, ElCheckboxButton };
export default ElCheckbox;

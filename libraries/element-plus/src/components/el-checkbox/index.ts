import { ElCheckbox, ElCheckboxGroup as ElCheckboxGroupPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

function ElCheckboxRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCheckboxGroup = registerComponent(ElCheckboxGroupPlus, { plugin: basicsPlugin });
const ElFormCheckboxGroup = withFormItem(ElCheckboxGroup, 'el-form-checkbox-group');

ElCheckbox.BaseComponent = ElCheckbox;
ElCheckboxGroup.BaseComponent = ElCheckboxGroupPlus;

export { ElCheckbox, ElCheckboxGroupPlus, ElCheckboxGroup, ElFormCheckboxGroup, ElCheckboxRegister };
export default ElCheckbox;

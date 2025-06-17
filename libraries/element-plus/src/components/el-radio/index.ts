import { ElRadio, ElRadioGroup as ElRadioGroupPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

function ElRadioGroupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElRadioGroup = registerComponent(ElRadioGroupPlus, { plugin: basicsPlugin });
const ElFormRadioGroup = withFormItem(ElRadioGroup, 'el-form-radio-group');

ElRadioGroup.BaseComponent = ElRadioGroupPlus;

export { ElRadio, ElRadioGroupPlus, ElRadioGroup, ElFormRadioGroup, ElRadioGroupRegister };
export default ElRadioGroup;

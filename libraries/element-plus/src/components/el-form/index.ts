import { ElForm as ElFormPlus, ElFormItem as ElFormItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';
import formItemPlugin from './plugins/form-item-plugin';
import { withFormItem } from './plugins/form-item';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from './constants';
import './index.less';

function ElFormRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElFormItemWrapRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(formItemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElForm = registerComponent(ElFormPlus, { plugin: basicsPlugin, name: 'el-form' });
const ElFormItemWrap = registerComponent(ElFormItemPlus, { plugin: formItemPlugin, name: 'el-form-item' });
const ElFormItem = ElFormItemPlus;
const ElFormItemPro = ElFormItemPlus;

export {
  ElForm,
  ElFormItemWrap,
  withFormItem,
  ElFormItem,
  ElFormRegister,
  ElFormItemWrapRegister,
  ElFormItemPlus,
  ElFormItemPro,
  ElFormPlus,
  $formProvide,
};
export { $formProvide };
export const ElFormBasicsPlugin = basicsPlugin;
export const ElFormItemBasicsPlugin = formItemPlugin;
export default ElForm;

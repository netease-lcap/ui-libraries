import { ElForm as ElFormPlus, ElFormItem as ElFormItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as formItemPlugin from './plugins/form-item-plugin';
import { withFormItem } from './plugins/form-item';
import './index.css';

function ElFormRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElFormItemWrapRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(formItemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElForm = registerComponent(ElFormPlus, { plugin: basicsPlugin, name: 'ElForm' });
const ElFormItemWrap = registerComponent(ElFormItemPlus, { plugin: formItemPlugin });
const ElFormItem = ElFormItemPlus;


export { ElForm, ElFormItemWrap, withFormItem, ElFormItem, ElFormRegister, ElFormItemWrapRegister };
export default ElForm;

import { ElFormItem as ElFormItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';
import './index.less';
import { $deletePropsList } from '@/plugins/constants';

function ElFormItemGroupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

/** 基于 ElFormItem 的表单项分组：无字段绑定；校验仅通过 validatingValue + validated() 手动触发 */
const ElFormItemGroup = registerComponent(ElFormItemPlus, {
  plugin: basicsPlugin,
  name: 'el-form-item-group',
});

export { ElFormItemGroup, ElFormItemGroupRegister, ElFormItemPlus };
export const ElFormItemGroupBasicsPlugin = basicsPlugin;
export default ElFormItemGroup;

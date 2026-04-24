import { ElSelect as ElSelectPlus, ElOption, ElOptionGroup } from 'element-plus';
import type { ISelectProps } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';
import { $deletePropsList } from '@/plugins/constants';
import './index.less';

function ElSelectRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElSelect = registerComponent(ElSelectPlus, {
  plugin: basicsPlugin,
  name: 'el-select',
});

const ElFormSelect = withFormItem(ElSelect, 'el-form-select');

export { ElSelect, ElOption, ElOptionGroup, ElFormSelect, ElSelectRegister, ElSelectPlus };
export const ElSelectBasicsPlugin = basicsPlugin;
export type { ISelectProps };
export default ElSelect;

import { ElSelect as ElSelectV2Plus, ElOption } from 'element-plus';
import type { ISelectProps } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';
import './index.css';

function ElSelectRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElSelect = registerComponent<ISelectProps>(ElSelectV2Plus, {
  plugin: basicsPlugin,
});
const ElFormSelect = withFormItem(ElSelect, 'el-form-select');


export { ElSelectV2Plus, ElSelect, ElOption, ElFormSelect, ElSelectRegister };
export type { ISelectProps };
export default ElSelect;

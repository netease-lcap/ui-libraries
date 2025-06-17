import { ElCascader as ElCascaderPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';
import './index.css';

function ElCascaderRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCascader = registerComponent(ElCascaderPlus, { plugin: basicsPlugin });
ElCascader.BaseComponent = ElCascaderPlus;
const ElFormCascader = withFormItem(ElCascader, 'el-form-cascader');

export { ElCascaderPlus, ElCascader, ElFormCascader, ElCascaderRegister };
export default ElCascader;

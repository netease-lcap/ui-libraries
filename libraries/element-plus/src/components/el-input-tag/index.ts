import { ElInputTag as ElInputTagPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '../../components/el-form/plugins/form-item';

function ElInputTagRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElInputTag = registerComponent(ElInputTagPlus, { plugin: basicsPlugin });
const ElFormInputTag = withFormItem(ElInputTag, 'el-form-input-tag');

ElInputTag.BaseComponent = ElInputTagPlus;

export { ElInputTagPlus, ElInputTag, ElFormInputTag, ElInputTagRegister };
export default ElInputTag;

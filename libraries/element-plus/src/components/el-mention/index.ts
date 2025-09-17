// import Mention from './mention.tsx';
import { ElMention as ElMentionPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form/plugins/form-item';
import './index.css';

function ElMentionRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElMention = registerComponent(ElMentionPlus, { plugin: basicPlugin, name: 'el-mention' });

const ElFormMention = withFormItem(ElMention, 'el-form-mention');

export { ElMentionPlus, ElMention, ElFormMention, ElMentionRegister };
export default ElMentionPlus;

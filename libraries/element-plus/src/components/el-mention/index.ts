// import Mention from './mention.tsx';
import { ElMention as ElMentionPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElMention = registerComponent(ElMentionPlus, {
  plugin: basicPlugin,
});

const ElFormMention = withFormItem(ElMention, 'el-form-mention');
export { ElMention, ElFormMention };
export default ElMentionPlus;

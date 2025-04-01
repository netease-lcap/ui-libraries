// import Mention from './mention.tsx';
import { ElMention as ElMentionPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

export const ElMention = registerComponent(ElMentionPlus, {
  plugin: basicPlugin,
});

export const ElFormMention = withFormItem(ElMention, 'el-form-mention');
export default ElMentionPlus;

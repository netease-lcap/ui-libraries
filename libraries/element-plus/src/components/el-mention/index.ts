// import Mention from './mention.tsx';
import { ElMention as ElMentionPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

export const ElMention = registerComponent(ElMentionPlus, {
  plugin: basicPlugin,
});
export default ElMentionPlus;

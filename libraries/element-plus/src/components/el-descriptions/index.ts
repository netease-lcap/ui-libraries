import { ElDescriptions as ElDescriptionsPlus, ElDescriptionsItem } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
// import * as itemPlugin from './plugins/item-plugin';
import 'element-plus/theme-chalk/el-descriptions.css';
import 'element-plus/theme-chalk/el-descriptions-item.css';

const ElDescriptions = registerComponent(ElDescriptionsPlus, { plugin: basicPlugin });
// const ElDescriptionsItem = registerComponent(ElDescriptionsItemPlus, { plugin: itemPlugin });
export default ElDescriptions;

export { ElDescriptions, ElDescriptionsItem };

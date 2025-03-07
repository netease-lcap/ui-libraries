import { ElLink as ElLinkPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-link.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.ts';

const ElLink = registerComponent(ElLinkPlus, { plugin: basicsPlugin });
export { ElLinkPlus, ElLink };
export default ElLink;

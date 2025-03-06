import { ElTree } from 'element-plus';
import 'element-plus/theme-chalk/el-tree.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import './index.css';

const ElTreePlus = registerComponent(ElTree, { plugin: basicsPlugin });
export { ElTreePlus };
export default ElTreePlus; 
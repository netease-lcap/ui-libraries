import { ElDrawer as ElDrawerPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-drawer.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElDrawer = registerComponent(ElDrawerPlus, { plugin: basicsPlugin });
export default ElDrawer;

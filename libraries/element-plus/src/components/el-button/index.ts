import { ElButton as ElButtonPlus } from 'element-plus';
// import 'element-plus/theme-chalk/el-button.css';
// import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.ts';

const ElButton = registerComponent(ElButtonPlus, { plugin: basicsPlugin });
export { ElButtonPlus, ElButton };
export default ElButton;

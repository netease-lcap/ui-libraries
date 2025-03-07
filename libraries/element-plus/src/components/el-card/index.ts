import { ElCard as ElCardPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-card.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElCard = registerComponent(ElCardPlus, { plugin: basicsPlugin });
export { ElCardPlus, ElCard };
export default ElCard;

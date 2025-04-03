import { ElButton as ElButtonPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.tsx';

const ElButton = registerComponent(ElButtonPlus, { plugin: basicsPlugin });
export { ElButtonPlus, ElButton };
export default ElButton;

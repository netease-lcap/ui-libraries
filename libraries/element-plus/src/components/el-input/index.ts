import { ElInput as ElInputPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-input.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';

// const ElInput = ElInputPlus;
const ElInput = registerComponet(ElInputPlus, { plugin: basicsPlugin });
export { ElInput, ElInputPlus };
export default ElInput;

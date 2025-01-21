import { ElSelect as ElSelectV2Plus, ElOption } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElSelect = registerComponet(ElSelectV2Plus, { plugin: basicsPlugin });
// const ElSelect = ElSelectV2Plus;
export { ElSelect, ElOption };
export default ElSelect;

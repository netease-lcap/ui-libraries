import { ElCascader as ElCascaderPlus } from 'element-plus';
// import {ElCalendar as el} from 'element-plus';
import 'element-plus/theme-chalk/el-cascader.css';
import 'element-plus/theme-chalk/el-cascader-panel.css';
// import 'element-plus/theme-chalk/dark/';
import { registerComponet } from '@/plugins';
import * as basicsPlugin from './plugins/index';

const ElCascader = registerComponet(ElCascaderPlus, { plugin: basicsPlugin });
// const ElCascader = ElCascaderPlus;
export { ElCascader };
export default ElCascader;

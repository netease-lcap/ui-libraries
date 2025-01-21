import { ElCheckbox, ElCheckboxGroup as ElCheckboxGroupPlus } from 'element-plus';
// import {ElCalendar as el} from 'element-plus';
import 'element-plus/theme-chalk/el-cascader.css';
import 'element-plus/theme-chalk/el-cascader-panel.css';
// import 'element-plus/theme-chalk/dark/';
import { registerComponet } from '@/plugins';
import * as basicsPlugin from './plugins/index';

const ElCheckboxGroup = registerComponet(ElCheckboxGroupPlus, { plugin: basicsPlugin });
// const ElCheckboxGroup = ElCheckboxGroupPlus;
// const ElCascader = ElCascaderPlus;
export { ElCheckbox, ElCheckboxGroup };
export default ElCheckboxGroup;

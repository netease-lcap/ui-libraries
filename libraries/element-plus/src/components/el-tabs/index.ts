import { ElTabs as ElTabsPlus, ElTabPane } from 'element-plus';
import 'element-plus/theme-chalk/el-tabs.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElTabs = registerComponet(ElTabsPlus, { plugin: basicsPlugin });
export { ElTabs, ElTabPane };
export default ElTabs;

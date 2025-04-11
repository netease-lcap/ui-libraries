import { ElTabs as ElTabsPlus, ElTabPane } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElTabs = registerComponent(ElTabsPlus, { plugin: basicsPlugin });
export { ElTabs, ElTabPane };
export default ElTabs;

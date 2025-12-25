import { ElButton as ElButtonPlus, ElButtonGroup } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';
import './index.css';

const ElButton = registerComponent(ElButtonPlus, { plugin: basicsPlugin, name: 'el-button' });
export { ElButtonPlus, ElButton, ElButtonGroup, basicsPlugin };
export const ElButtonBasicsPlugin = basicsPlugin;

export default ElButton;

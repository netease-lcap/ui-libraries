import { ElPopover as ElPopoverPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-popover.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElPopover = registerComponent(ElPopoverPlus, { plugin: basicsPlugin });
export default ElPopover;

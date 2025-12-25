import { ElCalendar as ElCalendarPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';

function ElCalendarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCalendar = registerComponent(ElCalendarPlus, { plugin: basicsPlugin, name: 'el-calendar' });
export { ElCalendarPlus, ElCalendar, ElCalendarRegister };
export const ElCalendarBasicsPlugin = basicsPlugin;
export default ElCalendar;

import { ElCalendar as ElCalendarPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElCalendarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCalendar = registerComponent(ElCalendarPlus, { plugin: basicsPlugin });
ElCalendar.BaseComponent = ElCalendarPlus;
export { ElCalendarPlus, ElCalendar, ElCalendarRegister };
export default ElCalendar;

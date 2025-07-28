import { Calendar as VantCalendar } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import './index.css';

function VanCalendarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCalendar = registerComponent(VantCalendar, { plugin: basicPlugin });
export { VanCalendarRegister, VanCalendar, VantCalendar };
export default VanCalendar;

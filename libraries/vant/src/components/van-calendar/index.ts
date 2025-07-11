import { Calendar as VantCalendar } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanCalendarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCalendar = VantCalendar;
export { VanCalendarRegister, VanCalendar, VantCalendar };
export default VanCalendar;

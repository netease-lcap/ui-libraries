import { Calendar as VantCalendar } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';
import * as basicPlugin from './plugins';
import './index.css';

function VanCalendarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCalendar = registerComponent(VantCalendar, { plugin: basicPlugin });
const VanFormCalendar = withFormItem(VanCalendar, 'van-form-calendar');

export { VanCalendarRegister, VanCalendar, VanFormCalendar, VantCalendar };
export default VanCalendar;

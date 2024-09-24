import Calendar from 'element-ui/lib/calendar';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElCalendar = registerComponent(Calendar, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElCalendar;

import { ElCalendar as ElCalendarPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-calendar.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.tsx';

const ElCalendar = registerComponent(ElCalendarPlus, { plugin: basicsPlugin });
export { ElCalendarPlus, ElCalendar };
export default ElCalendar;

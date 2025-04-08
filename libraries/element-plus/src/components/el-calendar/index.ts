import { ElCalendar as ElCalendarPlus } from 'element-plus';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElCalendar = registerComponent(ElCalendarPlus, { plugin: basicsPlugin });
export { ElCalendarPlus, ElCalendar };
export default ElCalendar;

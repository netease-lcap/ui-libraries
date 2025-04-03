import { ElLink as ElLinkPlus } from 'element-plus';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.tsx';

const ElLink = registerComponent(ElLinkPlus, { plugin: basicsPlugin });
export { ElLinkPlus, ElLink };
export default ElLink;

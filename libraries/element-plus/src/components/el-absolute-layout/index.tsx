import { registerComponet } from '@/plugins';
import * as plugins from './plugins';
import './index.css';

function AbsoluteLayout(props, { slots }) {
  return <div class="el-absolute-layout" {...props}>{slots.default()}</div>;
}
export const ElAbsoluteLayout = registerComponet(AbsoluteLayout, plugins);

export default ElAbsoluteLayout;

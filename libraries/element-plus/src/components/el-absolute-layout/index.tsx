import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import './index.css';

function AbsoluteLayout(props, { slots }) {
  return (
    <div class="el-absolute-layout" {...props}>
      {slots.default()}
    </div>
  );
}

function ElAbsoluteLayoutRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(plugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElAbsoluteLayout = registerComponent(AbsoluteLayout, { plugin: plugins, name: 'el-absolute-layout' });

export { ElAbsoluteLayoutRegister, ElAbsoluteLayout };
export const ElAbsoluteLayoutBasicsPlugin = plugins;
export default ElAbsoluteLayout;

import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import './index.css';

function AbsoluteLayout(props, { slots }) {
  return (
    <div class="van-absolute-layout" {...props}>
      {slots.default()}
    </div>
  );
}

function VanAbsoluteLayoutRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(plugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanAbsoluteLayout = registerComponent(AbsoluteLayout, { plugin: plugins, name: 'van-absolute-layout' });

export { VanAbsoluteLayoutRegister, VanAbsoluteLayout };
export default VanAbsoluteLayout; 
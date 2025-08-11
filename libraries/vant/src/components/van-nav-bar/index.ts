import { NavBar } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

import './index.css';

const VanNavBar = registerComponent(NavBar, {
  plugin: plugins,
  name: 'van-nav-bar',
});

export { VanNavBar };

export default VanNavBar;

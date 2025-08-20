import { ActionBar, ActionBarButton, ActionBarIcon } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

const VanActionBar = registerComponent(ActionBar, {
  plugin: plugins,
  name: 'van-action-bar',
});

const VanActionBarButton = registerComponent(ActionBarButton, {
  plugin: plugins,
  name: 'van-action-bar-button',
});

const VanActionBarIcon = registerComponent(ActionBarIcon, {
  plugin: plugins,
  name: 'van-action-bar-icon',
});

export { VanActionBar, VanActionBarButton, VanActionBarIcon };

export default VanActionBar;

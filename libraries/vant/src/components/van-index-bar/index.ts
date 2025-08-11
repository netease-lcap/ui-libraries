import { IndexBar, IndexAnchor } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

import './index.css';

const VanIndexBar = registerComponent(IndexBar, {
  plugin: plugins,
  name: 'van-index-bar',
});

const VanIndexAnchor = registerComponent(IndexAnchor, {
  plugin: plugins,
  name: 'van-index-anchor',
});

export { VanIndexBar, VanIndexAnchor };

export default VanIndexBar;

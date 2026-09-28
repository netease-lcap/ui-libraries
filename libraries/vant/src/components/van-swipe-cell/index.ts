import { SwipeCell as VanSwipeCellOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanSwipeCell = registerComponent(VanSwipeCellOrigin, {
  plugin: plugins,
  name: 'van-swipe-cell',
});

export default VanSwipeCell;

import { Progress as VanProgressOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanProgress = registerComponent(VanProgressOrigin, {
  plugin: plugins,
  name: 'van-progress',
});

export default VanProgress;

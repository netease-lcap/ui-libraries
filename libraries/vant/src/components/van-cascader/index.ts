import { Cascader as VanCascaderOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanCascader = registerComponent(VanCascaderOrigin, {
  plugin: plugins,
  name: 'van-cascader',
});

export default VanCascader; 
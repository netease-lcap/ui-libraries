import { Cascader as VanCascaderOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';

export const VanCascader = registerComponent(VanCascaderOrigin, {
  plugin: plugins,
  name: 'van-cascader',
});

export const VanFormCascader = withFormItem(VanCascader, 'van-form-cascader');

export default VanCascader;

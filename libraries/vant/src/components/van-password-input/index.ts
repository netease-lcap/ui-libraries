import { PasswordInput as VanPasswordInputOrigin } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const VanPasswordInput = registerComponent(VanPasswordInputOrigin, {
  plugin: plugins,
  name: 'van-password-input',
});

export default VanPasswordInput;


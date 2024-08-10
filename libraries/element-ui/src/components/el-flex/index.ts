import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import Flex from './flex';
import * as plugins from './plugins';

export const ElFlex = registerComponent(Flex, plugins);
export default ElFlex;

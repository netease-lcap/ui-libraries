import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import Flex from './flex';
import * as plugins from './plugins';

export const ElFlex = registerComponent(Flex, plugins, {
  methodNames: ['startLoading', 'closeLoading'],
});
export default ElFlex;

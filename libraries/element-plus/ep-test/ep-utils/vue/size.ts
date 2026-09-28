import { componentSizeMap } from '../../constants';

import type { ComponentSize } from '../../constants';

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default'];
};

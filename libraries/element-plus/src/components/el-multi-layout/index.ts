import ElMultiLayoutPlus from './multi-layout';
import ElMultiLayoutItemPlus from './multi-layout-item';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

export const ElMultiLayout = registerComponent(ElMultiLayoutPlus, { plugin: basicsPlugin });
export const ElMultiLayoutItem = registerComponent(ElMultiLayoutItemPlus, { plugin: itemPlugins });

export default ElMultiLayout;

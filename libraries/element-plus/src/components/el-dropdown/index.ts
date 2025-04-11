import {
  ElDropdown as ElDropdownPlus,
  ElDropdownItem as ElDropdownItemPlus,
  ElDropdownMenu as ElDropdownMenuPlus,
} from 'element-plus';

import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';
import { withFormItem } from '@/components/el-form';

const ElDropdown = registerComponent(ElDropdownPlus, { plugin: basicsPlugin });
const ElDropdownItem = registerComponent(ElDropdownItemPlus, { plugin: itemPlugins });

const ElDropdownMenu = ElDropdownMenuPlus;

export { ElDropdown, ElDropdownItem, ElDropdownMenu };

export default ElDropdown;

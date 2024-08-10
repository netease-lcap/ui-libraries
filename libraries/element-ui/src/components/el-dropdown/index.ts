import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElDropdown = registerComponent(Dropdown, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'dropdown'],
  methodNames: [],
});
export const ElDropdownMenu = DropdownMenu;
export const ElDropdownItem = DropdownItem;

export default ElDropdown;

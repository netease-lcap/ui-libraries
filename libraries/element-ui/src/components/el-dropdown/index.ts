import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as itemPlugins from './plugins/item-plugins';
import * as plugins from './plugins';

DropdownItem.methods.handleClick = function (e) {
  this.dispatch('ElDropdown', 'menu-item-click', [this.command, this]);
  this.$emit('click', e);
};

export const ElDropdown = registerComponent(Dropdown, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'dropdown'],
  methodNames: [],
});
export const ElDropdownMenu = DropdownMenu;
export const ElDropdownItem = registerComponent(DropdownItem, itemPlugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElDropdown;

import {
  ElDropdown as ElDropdownPlus,
  ElDropdownItem as ElDropdownItemPlus,
  ElDropdownMenu as ElDropdownMenuPlus,
} from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';
import { withFormItem } from '@/components/el-form';

function ElDropdownRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElDropdownItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDropdown = registerComponent(ElDropdownPlus, { plugin: basicsPlugin });
const ElDropdownItem = registerComponent(ElDropdownItemPlus, { plugin: itemPlugins });

const ElDropdownMenu = ElDropdownMenuPlus;

ElDropdown.BaseComponent = ElDropdownPlus;
ElDropdownItem.BaseComponent = ElDropdownItemPlus;

export { ElDropdownPlus, ElDropdownItemPlus, ElDropdownMenuPlus, ElDropdown, ElDropdownItem, ElDropdownMenu, ElDropdownRegister, ElDropdownItemRegister };

export default ElDropdown;

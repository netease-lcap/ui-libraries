import { ElTable as ElTablePlus, ElTableColumn as ElTableColumnPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

import basicsPlugin from './plugins/index';
import columnPlugin from './plugins/column';
import columnDynamicPlugin from './plugins/column-dynamic';
import { ElTableToolBar } from './plugins/table-toolbar';
import './index.css';

function ElTableRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElTableColumnRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(columnPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTable = registerComponent(ElTablePlus, { plugin: basicsPlugin, name: 'el-table' });
const ElTableColumn = registerComponent(ElTableColumnPlus, { plugin: columnPlugin, name: 'ElTableColumn' });
const ElTableColumnDynamic = registerComponent(ElTableColumnPlus, {
  plugin: columnDynamicPlugin,
  name: 'ElTableColumnDynamic',
});

export {
  ElTableColumn,
  ElTableColumnPlus,
  ElTableColumnDynamic,
  ElTable,
  ElTablePlus,
  ElTableToolBar,
  ElTableRegister,
  ElTableColumnRegister,
};
export const ElTableBasicsPlugin = basicsPlugin;
export const ElTableColumnBasicsPlugin = columnPlugin;
export const ElTableColumnDynamicBasicsPlugin = columnDynamicPlugin;
export default ElTable;

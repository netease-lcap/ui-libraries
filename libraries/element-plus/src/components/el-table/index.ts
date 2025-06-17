import { ElTable as ElTablePlus, ElTableColumn as ElTableColumnPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import { ElFlex } from '@/components/el-flex';

import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/column';
import * as tableToolBarPlugin from './plugins/table-toolbar.tsx';
import './index.css';

function ElTableRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElTableColumnRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(columnPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElTableToolBarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(tableToolBarPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTable = registerComponent(ElTablePlus, { plugin: basicsPlugin, name: 'ElTable' });
const ElTableColumn = registerComponent(ElTableColumnPlus, { plugin: columnPlugin, name: 'ElTableColumn' });
const ElTableToolBar = registerComponent<{ columns: any; selectedColumns: any; setSelectedColumns: any }>(ElFlex, {
  plugin: tableToolBarPlugin,
  name: 'ElTableToolBar',
});

ElTable.BaseComponent = ElTablePlus;
ElTableColumn.BaseComponent = ElTableColumnPlus;
ElTableToolBar.BaseComponent = ElFlex;

export { ElTableColumn, ElTable, ElTablePlus, ElTableToolBar, ElTableRegister, ElTableColumnRegister, ElTableToolBarRegister };
export default ElTable;

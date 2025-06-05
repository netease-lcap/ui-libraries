import { ElTable as ElTablePlus, ElTableColumn as ElTableColumnPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import { ElFlex } from '@/components/el-flex';

import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/column';
import * as tableToolBarPlugin from './plugins/table-toolbar.tsx';
import './index.css';

// const ElTable = ElTablePlus;
const ElTable = registerComponent(ElTablePlus, { plugin: basicsPlugin, name: 'ElTable' });
const ElTableColumn = registerComponent(ElTableColumnPlus, { plugin: columnPlugin, name: 'ElTableColumn' });
const ElTableToolBar = registerComponent<{ tableSlots: any }>(ElFlex, {
  plugin: tableToolBarPlugin,
  name: 'ElTableToolBar',
});
export { ElTableColumn, ElTable, ElTablePlus, ElTableToolBar };
export default ElTable;

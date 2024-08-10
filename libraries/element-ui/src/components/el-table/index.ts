import Table from 'element-ui/lib/table';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';
export { default as ElTableColumn } from './column';

export const ElTable = registerComponent(Table, plugins, {
  nativeEvents: [],
  slotNames: ['append', 'default'],
  methodNames: [
    'clearSelection',
    'toggleRowSelection',
    'toggleAllSelection',
    'toggleRowExpansion',
    'setCurrentRow',
    'clearSort',
    'clearFilter',
    'doLayout',
    'sort',
  ],
});

export default ElTable;

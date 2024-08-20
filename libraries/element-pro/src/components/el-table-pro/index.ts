import { Table, BaseTable, PrimaryTable, EnhancedTable } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElTablePro = registerComponent(Table, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElBaseTablePro = BaseTable;
export const ElPrimaryTablePro = PrimaryTable;
export const ElEnhancedTablePro = EnhancedTable;

export default ElTablePro;

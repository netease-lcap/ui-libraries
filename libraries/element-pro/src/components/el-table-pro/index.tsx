/* eslint-disable react/react-in-jsx-scope */
import {
  Table, BaseTable, PrimaryTable, EnhancedTable,
} from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import {
  computed,
  defineComponent,
  SetupContext,
  ref,
  nextTick,
  PropType,
  watch,
  onMounted,
  toRefs,
} from '@vue/composition-api';
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

export const ElTableColumnPro = defineComponent({
  name: 'ElTableColumnPro',
  setup(props, { slots }: SetupContext) {
    return {
      slots,
    };
  },
  render() {
    return (
      <div>
        {this.slots.default?.()}
        {this.slots.cell?.()}
      </div>
    );
  },
});

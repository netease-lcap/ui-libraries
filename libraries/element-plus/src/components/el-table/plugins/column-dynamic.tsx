import { TableColumnCtx } from 'element-plus';
import _ from 'lodash';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { useRequestDataSource } from '@/plugins/common/dataSource';
import columnPlugin from './column';
import { ElTableColumn } from '@/index';

const ColumnDynamicPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTableColumnDynamicOptions<any, any, any, any, any>,
  TableColumnCtx<any>
>();
function ColumnDynamicRender(props, { attrs, slots }) {
  return _.map(props?.data, (item, index) => (
    <ElTableColumn
      {...props}
      {...attrs}
      v-slots={_.assign({}, slots, {
        header: () => slots.header?.({ item } as any),
        default: (current) => slots.default?.({ ...current, columnItem: item, columnIndex: index } as any),
      })}
    />
  ));
}
export default ColumnDynamicPluginAccumulate.addAccumulate(columnPlugin).addPlugin({
  name: 'handleColumnDynamic',
  handle(props) {
    const dataSource = props.get('dataSource');
    const { data } = useRequestDataSource(dataSource);
    return {
      render: ColumnDynamicRender,
      data,
    };
  },
});

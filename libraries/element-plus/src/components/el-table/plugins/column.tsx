import { ref, cloneVNode } from 'vue';
import _ from 'lodash';
import { TableColumnCtx } from 'element-plus';
import { useMemo, useCallback } from '@/plugins/hooks';
import { ElIcon } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const EditDefault = {
  name: 'editDefault',
  inheritAttrs: false,
  setup(props, { attrs, emit, expose }) {
    const { item, slots, editChange = () => {}, setValue } = attrs;
    const editable = ref(false);
    const formItemRef = ref({});
    return () => {
      return !editable.value ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {slots.default?.({
            ...item,
            index: item.$index,
            item: item.row,
            rowIndex: item.$index,
            columnIndex: item.cellIndex,
            editable: editable.value,
          })}
          <ElIcon
            onClick={() => {
              editable.value = true;
            }}
            size={18}
            name="Edit"
            style={{ marginLeft: '10px' }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {slots
            .default?.({
              ...item,
              index: item.$index,
              item: item.row,
              rowIndex: item.$index,
              columnIndex: item.cellIndex,
              editable,
            })
            ?.map((node) => cloneVNode(node, {
                onValidateSuccess: () => {},
                ref: formItemRef,
              }))}
          <ElIcon
            onClick={() => {
              formItemRef?.value?.validate?.()?.then(() => {
                editable.value = false;
                _.attempt(editChange, item);
              });
            }}
            size={18}
            name="DocumentAdd"
            style={{ marginLeft: '10px' }}
          />
        </div>
      );
    };
  },
};
const ColumnPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTableColumnOptions<any, any, any, any>,
  TableColumnCtx<any> & { editable: boolean }
>();
export default ColumnPluginAccumulate.addPlugin({
  name: 'handleColumn',
  handle(props) {
    const slots = props.get('slots');
    const width = props.get('width') || _.get(props.get('style'), 'width', '');
    const minWidth = props.get('minWidth') || _.get(props.get('style'), 'min-width', '');
    const align = props.get('align') || _.get(props.get('style'), 'text-align', 'left');
    return {
      align,
      width,
      minWidth,
      slots: {
        ...slots,
        default: (item: any) => slots?.default?.({
            ...item,
            index: item.$index,
            item: item.row,
            rowIndex: item.$index,
            columnIndex: item.cellIndex,
          }),
      },
    } as {
      align: string;
      width: string;
      minWidth: string;
      slots: {
        default: (item: any) => any;
        [key: string]: any;
      };
    };
  },
})
  .addPlugin({
    name: 'handleSort',
    handle(props) {
      const sortableProps = props.get('sortable');
      const sortable = useMemo(() => (sortableProps === 'custom' ? 'custom' : false), [sortableProps]);
      return {
        sortable,
      };
    },
  })
  .addPlugin({
    name: 'handleEditable',
    handle(props) {
      const editableProps = props.get('type');
      const editable = props.get('editable');
      if (editableProps !== 'editable' && !editable) {
        return {};
      }

      const slots = props.get('slots');
      const editChange = props.get('onEditChange');

      return {
        slots: {
          ...slots,
          default: useCallback(
            (item: any): any => <EditDefault item={item} slots={slots} editChange={editChange} />,
            [slots],
          ),
        },
      };
    },
  });

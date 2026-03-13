import { ref, cloneVNode, nextTick } from 'vue';
import _ from 'lodash';
import { TableColumnCtx } from 'element-plus';
import { useMemo, useCallback, useEffect } from '@/plugins/hooks';
import { ElIcon, ElCheckbox } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { $deletePropsList } from '@/plugins/constants';
import { addClass } from '@/utils';

const EditDefault = {
  name: 'editDefault',
  inheritAttrs: false,
  setup(props, { attrs, emit, expose }) {
    const { item, slots, editChange = () => { }, setValue } = attrs;

    const editable = ref(false);
    const formItemRef = ref({});
    return () => {
      return !editable.value ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {slots.default?.({
            row: item.row,
            index: item.$index,
            item: item.row,
            rowIndex: item.$index,
            columnIndex: item.cellIndex,
            editable: editable.value,
            isPreview: !editable.value,
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
          {
            slots.default?.({
              row: item.row,
              index: item.$index,
              item: item.row,
              rowIndex: item.$index,
              columnIndex: item.cellIndex,
              editable: editable.value,
              isPreview: !editable.value,
            })
              ?.map((node) => cloneVNode(node, {
                onValidateSuccess: () => { },
                ref: formItemRef,
              }))
          }
          <ElIcon
            onClick={() => {
              formItemRef?.value?.validate?.()?.then(() => {
                editable.value = false;
                _.attempt(editChange, item);
              });
            }}
            size={18}
            name="DocumentAdd"
            style={{ marginLeft: '10px', marginBottom: '18px' }}
          />
        </div>
      );
    };
  },
};
const ColumnPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTableColumnOptions<any, any, any, any>,
  TableColumnCtx<any> & { editable: boolean; 'data-nodepath': string }
>();
export default ColumnPluginAccumulate.addPlugin({
  name: 'handleColumn',
  handle(props) {
    const slots = props.get('slots');
    const widthProps = props.get('width') || _.get(props.get('style'), 'width', '');
    const regexNumberOrPx = /^\d+$|^\d+px$/;
    const isFixedWidth = regexNumberOrPx.test(widthProps);
    const deletePropsList = props.get($deletePropsList).concat(isFixedWidth ? [] : 'width');
    const width = isFixedWidth ? { width: widthProps } : { minWidth: widthProps };
    const minWidth = props.get('minWidth') || _.get(props.get('style'), 'min-width', '');
    const widthObj = _.mergeWith(width, { minWidth }, (obj, src) => src || obj);
    const align = props.get('align') || _.get(props.get('style'), 'text-align', 'left');
    return {
      align,
      ...widthObj,
      [$deletePropsList]: deletePropsList,
      slots: {
        ...slots,
        default: (item: any) => slots?.default?.({
          ...item,
          index: item?.$index,
          item: item?.row,
          rowIndex: item?.$index,
          columnIndex: item?.cellIndex,
        }),
      },
    } as {
      align: string;
      width?: string;
      [$deletePropsList]: string[];
      minWidth?: string;
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
    name: 'handleTypeIndex',
    handle(props) {
      const type = props.get('type');
      const inject = props.get('inject');
      const autoIndex = props.get('autoIndex');
      const index = useCallback((index) => (inject.currentPage - 1) * inject.pageSize + index + 1, [inject]);
      const isAutoIndex = type === 'index' && autoIndex;
      return isAutoIndex ? { index } : {};
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
  })
  .addPlugin({
    name: 'handleTypeDraggable',
    handle(props) {
      const type = props.get('type');
      if (type !== 'draggable') return {};
      const refId = props.get('data-ref-id');
      const className = props.get('class');
      return {
        slots: {
          header: useCallback(() => null, []),
          default: useCallback(() => <el-icon class="draggableColumns" name="Rank" />, [refId]),
        },

      };
    },
  })
  .addPlugin({
    name: 'handleNodePath',
    type: 'ide',
    handle(props) {
      const className = useMemo(() => _.uniqueId('el-table-column'), []);
      const nodePath = props.get('data-nodepath');
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      useEffect(() => {
        setTimeout(() => {
          const node = document.querySelectorAll(`.${className}`);
          node.forEach((item) => {
            item.setAttribute('data-nodepath', nodePath);
            item.setAttribute('data-nodepath-multiple', 'true');
          });
        }, 300);
      }, []);
      return {
        className,
        [$deletePropsList]: deletePropsList,
      };
    },
  })
  .addPlugin({
    name: 'handleSelectionAndIndex',
    type: 'ide',
    handle(props) {
      const type = props.get('type');
      const slots = props.get('slots');
      const defaultSlot = ['selection', 'index'].includes(type) ? () => null : slots.default;
      return {
        slots: _.assign(slots, { default: defaultSlot }),
      };
    },
  });

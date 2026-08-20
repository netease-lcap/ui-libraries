/* eslint-disable no-nested-ternary */
import { ref, cloneVNode, defineComponent, PropType } from 'vue';
import _ from 'lodash';
import { TableColumnCtx } from 'element-plus';
import { useMemo, useCallback } from '@/plugins/hooks';
import { ElIcon } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { $deletePropsList } from '@/plugins/constants';
import { addClass } from '@/utils';

/** 未设 width/minWidth 的列：按内容自适应（由表级插件测宽） */
export const FIT_CONTENT_COLUMN_CLASS = 'el-table-column--fit-content';

const BUILTIN_COLUMN_TYPES = ['selection', 'index', 'expand', 'draggable'];

function isEmptySize(value: unknown) {
  return value === undefined || value === null || value === '';
}

const EditDefault = defineComponent({
  name: 'editDefault',
  inheritAttrs: false,
  props: {
    item: { type: Object, required: true },
    slots: { type: Object, required: true },
    editChange: {
      type: Function as PropType<(item: any) => void>,
      default: () => {},
    },
  },
  setup(props) {
    const { item, slots, editChange } = props;

    const editable = ref(false);
    const formItemRef = ref<{ validate:() => Promise<void> }>({ validate: () => Promise.resolve() });
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
          {slots
            .default?.({
              row: item.row,
              index: item.$index,
              item: item.row,
              rowIndex: item.$index,
              columnIndex: item.cellIndex,
              editable: editable.value,
              isPreview: !editable.value,
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
});
const ColumnPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTableColumnOptions<any, any, any, any>,
  TableColumnCtx<any> & { editable: boolean; 'data-nodepath': string }
>();
export default ColumnPluginAccumulate.addPlugin({
  name: 'handleColumn',
  handle(props) {
    const slots = props.get('slots');
    const style = props.get('style') ?? {};
    const widthProps = props.get('width') || _.get(style, 'width', '');
    const minWidthProps = props.get('minWidth') || _.get(style, 'min-width', '') || _.get(style, 'minWidth', '');
    const type = props.get('type');
    const isBuiltInType = BUILTIN_COLUMN_TYPES.includes(type);
    const isFitContent = !isBuiltInType && isEmptySize(widthProps) && isEmptySize(minWidthProps);

    const regexNumberOrPx = /^\d+$|^\d+px$/;
    const isFixedWidth = regexNumberOrPx.test(String(widthProps));
    const deletePropsList = ((props.get($deletePropsList) as string[]) ?? []).concat(isFixedWidth ? [] : 'width');
    const align = props.get('align') || _.get(style, 'text-align') || _.get(style, 'textAlign', 'left');
    const className = props.get('className') ?? '';

    const slotsResult = {
      ...slots,
      default: (item: any) => slots?.default?.({
          ...item,
          index: item?.$index,
          item: item?.row,
          rowIndex: item?.$index,
          columnIndex: item?.cellIndex,
        }),
    };

    if (isFitContent) {
      return {
        align,
        className: addClass(className, FIT_CONTENT_COLUMN_CLASS),
        [$deletePropsList]: deletePropsList,
        slots: slotsResult,
      };
    }

    const width = isFixedWidth ? { width: widthProps } : widthProps ? { minWidth: widthProps } : {};
    const widthObj = _.mergeWith(width, minWidthProps ? { minWidth: minWidthProps } : {}, (obj, src) => src || obj);

    return {
      align,
      ...widthObj,
      [$deletePropsList]: deletePropsList,
      slots: slotsResult,
    } as {
      align: string;
      width?: string;
      [$deletePropsList]: string[];
      minWidth?: string;
      className?: string;
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
      const width = props.get('width');
      const minWidth = props.get('minWidth');
      const isSortable = sortableProps === 'custom';
      const widthPatch: { minWidth?: string; width?: string } = isSortable && (minWidth || width)
          ? minWidth
            ? { minWidth: `${parseInt(String(minWidth), 10) + 20}px` }
            : { width: `${parseInt(String(width), 10) + 20}px` }
          : {};

      return {
        sortable,
        ...widthPatch,
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
      const ideClassName = useMemo(() => _.uniqueId('el-table-column'), []);
      const nodePath = props.get('data-nodepath');
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      setTimeout(() => {
        const node = document.querySelectorAll(`.${ideClassName}`);
        node.forEach((item) => {
          item.setAttribute('data-nodepath', nodePath);
          item.setAttribute('data-nodepath-multiple', 'true');
        });
      }, 300);
      return {
        className: addClass(props.get('className') ?? '', ideClassName),
        key: nodePath,
        [$deletePropsList]: deletePropsList,
      };
    },
  })
  .addPlugin({
    name: 'handleSelectionAndIndex',
    handle(props) {
      const type = props.get('type');
      const slots = props.get('slots');
      const defaultSlot = ['selection', 'index'].includes(type) ? () => null : slots.default;
      return {
        slots: _.assign(slots, { default: defaultSlot }),
      };
    },
  });

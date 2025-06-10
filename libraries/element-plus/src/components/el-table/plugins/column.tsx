import { ref, cloneVNode } from 'vue';
import _ from 'lodash';
import { useMemo, useState, useCallback } from '@/plugins/hooks';

export function columnPlugin(props) {
  const slots = props.get('slots');

  return {
    slots: {
      ...slots,
      default: (item) => slots?.default?.({
          ...item,
          index: item.$index,
          item: item.row,
          rowIndex: item.$index,
          columnIndex: item.cellIndex,
        }),
    },
  };
}

export function handleSort(props) {
  const sortableProps = props.get('sortable');

  const sortable = useMemo(() => (sortableProps === 'custom' ? 'custom' : false), [sortableProps]);
  return {
    sortable,
  };
}
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
          <el-icon
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
                onValidateSuccess: () => {
                  // editable.value = false;
                },
                ref: formItemRef,
              }))}
          <el-icon
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
export function handleEditable(props) {
  const editableProps = props.get('editable');
  if (!editableProps) {
    return {};
  }

  const slots = props.get('slots');
  const editChange = props.get('onEditChange');

  return {
    slots: {
      ...slots,
      default: (item) => <EditDefault item={item} slots={slots} editChange={editChange} />,
    },
  };
}

import { useMemo } from '@/plugins/hooks';

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

export function columnPlugin(props) {
  const slots = props.get('slots');
  return {
    slots: {
      ...slots,
      default: (item) => slots?.default?.({ ...item, index: item.$index, item: item.row }),
    },
  };
}

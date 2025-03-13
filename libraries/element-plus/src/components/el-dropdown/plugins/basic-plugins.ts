/* 组件功能扩展插件 */
export function useSlot(props) {
  const slots = props.get('slots');
  return {
    slots: Object.assign(slots, {
      'dropdown': slots.items,
    }),
  };
}

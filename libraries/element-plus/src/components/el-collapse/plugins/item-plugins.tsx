/* 组件功能扩展插件 */
import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';

export function handleSlots(props) {
  const slots = props.get('slots');
  const titleSlot = slots.title;

  const wrappedSlots = useMemo(
    () => (_.isNil(titleSlot)
        ? {}
        : {
            title: (arg) => <div class="el-collapse-item__title">{titleSlot?.(arg)}</div>,
          }),
    [titleSlot],
  );

  return {
    slots: _.assign({}, slots, wrappedSlots),
  };
}

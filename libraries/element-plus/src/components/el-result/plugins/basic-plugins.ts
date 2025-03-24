/* 组件功能扩展插件 */
import _ from 'lodash';

export function handleSlots(props) {
  const slots = props.get('slots');

  return {
    slots: _.assign(slots, {
      'sub-title': slots.subTitle,
    }),
  };
}

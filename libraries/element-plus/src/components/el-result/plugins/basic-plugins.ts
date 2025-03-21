/* 组件功能扩展插件 */
import _ from 'lodash';

export function handleSlots(props) {
  const slots = props.get('slots');

  return {
    slots: _.mapKeys(slots, (value, key) => (key === 'subTitle' ? 'sub-title' : key)),
  };
}

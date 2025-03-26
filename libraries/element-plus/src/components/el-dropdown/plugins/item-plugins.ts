import { h } from 'vue';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import ElIcon from '../../el-icon/index';

// export function useExtendsPlugin(props) {
//   const slots = props.get('slots');

//   return {
//     slots: {
//       ...slots,
//       default: () => {
//         const icon = props.get('icon');
//         const vnodes: any[] = _.isFunction(slots.default) ? slots.default() : [];
//         if (icon) {
//           vnodes.unshift(h(ElIcon, { name: icon }));
//         }
//         return vnodes;
//       },
//     },
//     [$deletePropsList]: ['icon'],
//   };
// }

export function handleItemPlugin(props) {
  return {
    [$deletePropsList]: ['icon'],
  };
}

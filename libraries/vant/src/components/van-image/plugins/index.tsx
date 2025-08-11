// import _ from 'lodash';

// export function useImageSlot(props: any) {
//   const slots = props.get('slots');
//   const isCustomDefault = props.get('isCustomDefault');
//   return {
//     slots: _.assign(slots, {
//       default: isCustomDefault ? slots.default : null,
//     }),
//   };
// }

export function handleCrossOrigin(props) {
  const crossorigin = props.get('crossorigin') || undefined;
  const referrerpolicy = props.get('referrerpolicy') || undefined;
  return {
    crossorigin,
    referrerpolicy,
  };
}

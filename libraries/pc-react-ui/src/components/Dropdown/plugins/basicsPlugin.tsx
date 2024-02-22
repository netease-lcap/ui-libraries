import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList, $dataSourceField } from '@/plugins/constants';

export function useHandleTransform(props) {
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'items']);
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'key');
  return {
    [$deletePropsList]: deletePropsList,
    [$dataSourceField]: 'items',
    fieldNames: {
      label: textField,
      value: valueField,
    },
  };
}
// export function useHandleOpenRef(props) {
//   const openProps = props.get('open');
//   const defaultOpen = props.get('defaultOpen');
//   const onOpenChangeProps = props.get('onOpenChange');
//   const ref = props.get('ref');
//   const modalRef = React.useRef();
//   const deletePropsList = props.get($deletePropsList, []).concat(['ref', 'defaultOpen']);
//   const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({ value: openProps, defaultValue: defaultOpen }));
//   React.useImperativeHandle(ref, () => ({
//     open: () => setOpen(true),
//     close: () => setOpen(false),
//     visible: open,
//   }), [modalRef]);
//   return {
//     [$deletePropsList]: deletePropsList,
//     open,
//     onOpenChange: _.wrap(onOpenChangeProps, (...args) => {
//       setOpen(false);
//       _.attempt(onOpenChangeProps, ...args);
//     }),
//   };
// }

export function useMergeMenu(props) {
  const menu = props.get('menu');
  const items = props.get('items', []);
  console.log(props.toJS(), 'tojhs');
  return {
    menu: {
      ...menu,
      items,
    },
  };
}
useMergeMenu.order = 6;

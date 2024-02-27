import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const onOpenChange = props.get('onOpenChange');
  const ref = props.get('ref');
  const modalRef = React.useRef();
  const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({ value: openProps, onChange: onOpenChange }));
  React.useImperativeHandle(ref, () => ({
    toggle: setOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
  }), [modalRef]);
  return {
    open,
    onOpenChange: _.wrap(onOpenChange, (...args) => {
      setOpen(args[1]);
      _.attempt(onOpenChange, ...args);
    }),
    // ref: modalRef,
  };
}

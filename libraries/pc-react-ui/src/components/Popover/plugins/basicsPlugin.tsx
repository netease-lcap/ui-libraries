import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const onOpenChange = props.get('onOpenChange');
  const ref = props.get('ref');
  // const modalRef = React.useRef();
  const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({ value: openProps, onChange: onOpenChange }));
  const selfRef = React.useMemo(() => ({
    toggle: setOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    ...ref,
  }), [ref, open, setOpen]);
  return {
    open,
    ref: selfRef,
    onOpenChange: _.wrap(onOpenChange, (fn, visible) => {
      setOpen(visible);
      _.attempt(onOpenChange, visible);
    }),
    // ref: modalRef,
  };
}

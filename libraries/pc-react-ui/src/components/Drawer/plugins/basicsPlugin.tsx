import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const defaultOpen = props.get('defaultOpen');
  const onCloseProps = props.get('onClose');
  const ref = props.get('ref');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref', 'defaultOpen']);
  const modalRef = React.useRef();
  const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({
    value: openProps,
    defaultValue: defaultOpen,
  }));
  React.useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    visible: open,
  }), [modalRef]);
  return {
    [$deletePropsList]: deletePropsList,
    open,
    setOpen,
    onClose: _.wrap(onCloseProps, (...args) => {
      setOpen(false);
      _.attempt(onCloseProps, ...args);
    }),
  };
}

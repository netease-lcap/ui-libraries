import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const defaultOpen = props.get('defaultOpen');
  const onCancelProps = props.get('onCancel');
  const onOkProps = props.get('onOk');
  const ref = props.get('ref');
  const modalRef = React.useRef();
  const deletePropsList = props.get($deletePropsList, []).concat(['ref', 'defaultOpen']);
  const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({ value: openProps, defaultValue: defaultOpen }));
  React.useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    visible: open,
  }), [modalRef]);
  return {
    [$deletePropsList]: deletePropsList,
    open,
    onCancel: _.wrap(onCancelProps, (...args) => {
      setOpen(false);
      _.attempt(onCancelProps, ...args);
    }),
    onOk: _.wrap(onOkProps, (...args) => {
      setOpen(false);
      _.attempt(onOkProps, ...args);
    }),
  };
}

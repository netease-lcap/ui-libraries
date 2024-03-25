import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const defaultOpen = props.get('defaultOpen');
  const onOpenChangeProps = props.get('onOpenChange');
  const ref = props.get('ref');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref', 'defaultOpen']);
  const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({
    value: openProps,
    defaultValue: defaultOpen,
    onChange: onOpenChangeProps,
  }));

  const selfRef = React.useMemo(() => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    visible: !!open,
    ...ref,
  }), [ref, open, setOpen]);
  return {
    [$deletePropsList]: deletePropsList,
    open,
    ref: selfRef,
    onDropdownVisibleChange: setOpen,
  };
}

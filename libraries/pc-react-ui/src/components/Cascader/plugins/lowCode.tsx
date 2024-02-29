import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const defaultOpen = props.get('defaultOpen');
  const onDropdownVisibleChangeProps = props.get('onDropdownVisibleChange', () => { });
  const ref = props.get('ref');
  const deletePropsList = props.get($deletePropsList, []).concat(['defaultOpen']);
  const [open, setOpen] = useControllableValue(_.filterUnderfinedValue({
    value: openProps,
    defaultValue: defaultOpen,
    onChange: onDropdownVisibleChangeProps,
  }));
  const selfRef = React.useMemo(() => ({
    ...ref,
    open: () => setOpen(true),
    close: () => setOpen(false),
    visible: !!open,
  }), [setOpen, open, ref]);
  return {
    [$deletePropsList]: deletePropsList,
    open,
    ref: selfRef,
    onDropdownVisibleChange: _.wrap(onDropdownVisibleChangeProps, (fn, visible) => {
      setOpen(visible);
      _.attempt(onDropdownVisibleChangeProps, visible);
    }),
  };
}

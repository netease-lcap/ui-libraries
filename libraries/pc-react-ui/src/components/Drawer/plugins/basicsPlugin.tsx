import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleOpenRef(props) {
  const openProps = props.get('open');
  const ref = props.get('ref');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref']);
  const modalRef = React.useRef();
  const [open, setOpen] = useControllableValue({
    ...(!_.isNil(openProps) ? { value: openProps } : {}),
  });
  React.useImperativeHandle(ref, () => ({
    setOpen,
    open,
  }), [modalRef]);
  return {
    [$deletePropsList]: deletePropsList,
    open,
    setOpen,
  };
}

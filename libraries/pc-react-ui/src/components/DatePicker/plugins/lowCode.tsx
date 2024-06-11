import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { ConfigProvider } from 'antd';
import { $deletePropsList } from '@/plugins/constants';

import FormContext from '@/components/Form/form-context';

export function useHandleNodePath(props) {
  const { isForm } = React.useContext(FormContext);
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);

  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const prefixCls = getPrefixCls();
  const id = _.uniqueId('contact_');
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const datePicker = document.querySelector(`[data-node-id=${id}]`)?.closest(`.${prefixCls}-form-item-row`);
    datePicker?.setAttribute('data-nodepath', nodePath);
    if (!isForm) return;
    datePicker?.setAttribute('data-tag-name', 'FormDatePicker');
    datePicker?.setAttribute('data-has-mutation', 'true');
  }, [id]);
  return {
    [$deletePropsList]: deletePropsList,
    'data-node-id': id,
  };
}

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
    onOpenChange: setOpen,
  };
}

import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { ConfigProvider } from 'antd';
import FormContext from '@/components/Form/form-context';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleNodePath(props) {
  const { isForm } = React.useContext(FormContext);
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls();
  const nodeId = React.useMemo(() => _.uniqueId('input_'), []);
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const inputElement = document.querySelector(`[data-node-id=${nodeId}]`);
    const inputParent = inputElement?.closest(`.${prefixCls}-form-item-row`);
    inputParent?.setAttribute('data-nodepath', nodePath);
    if (!isForm) return;
    inputParent?.setAttribute('data-tag-name', 'FormTimeRangePicker');
  }, [nodePath, isForm, nodeId, prefixCls]);
  return {
    'data-node-id': nodeId,
    [$deletePropsList]: deletePropsList,
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
    ...ref,
    open: () => setOpen(true),
    close: () => setOpen(false),
    visible: !!open,
  }), [ref, open, setOpen]);
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    open,
    onOpenChange: _.wrap(onOpenChangeProps, (visible) => {
      setOpen(visible);
      _.attempt(onOpenChangeProps, visible);
    }),
  };
}

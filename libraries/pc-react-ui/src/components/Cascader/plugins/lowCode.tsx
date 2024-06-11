import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { ConfigProvider } from 'antd';
import { $deletePropsList } from '@/plugins/constants';

import FormContext from '@/components/Form/form-context';

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
export function useHandleNodePath(props) {
  const { isForm } = React.useContext(FormContext);
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls();
  const nodeId = _.uniqueId('input_');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const inputElement = document.querySelector(`[data-node-id=${nodeId}]`);
    const inputParent = inputElement?.closest(`.${prefixCls}-form-item-row`);
    inputParent?.setAttribute('data-nodepath', nodePath);
    if (!isForm) return;
    inputParent?.setAttribute('data-tag-name', 'FormCascader');
    inputParent?.setAttribute('data-has-mutation', 'true');
  }, [nodeId]);
  return {
    'data-node-id': nodeId,
    [$deletePropsList]: deletePropsList,
  };
}

import React from 'react';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import { ConfigProvider } from 'antd';
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
export function useHandleRemoteEmptyItems(props) {
  const items = props.get('items');
  const deletePropsList = props.get($deletePropsList);
  const itemsDelete = _.isEmpty(items) ? ['items'] : [];
  return {
    [$deletePropsList]: deletePropsList.concat(itemsDelete),
  };
}

useHandleRemoteEmptyItems.order = 5;

export function useHandleNodePath(props) {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls();
  const nodeId = _.uniqueId('input_');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const dropdownNode = document.querySelector(`[data-nodeid=${nodeId}]`);
    const dropdownTriggerNode = dropdownNode?.closest(`.${prefixCls}-dropdown-trigger`);
    dropdownTriggerNode?.setAttribute('data-nodepath', nodePath);
    // console.log(dropdownNode, `.${prefixCls}-dropdown-trigger`, dropdownTriggerNode, 'node');
  }, [nodePath, nodeId]);
  return {
    'data-nodeid': nodeId,
    [$deletePropsList]: deletePropsList,
  };
}

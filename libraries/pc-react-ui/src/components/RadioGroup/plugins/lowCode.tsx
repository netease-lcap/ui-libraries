import React from 'react';
import _ from 'lodash';
import { ConfigProvider } from 'antd';
import { $deletePropsList } from '@/plugins/constants';
import FormContext from '@/components/Form/form-context';

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
    inputParent?.setAttribute('data-tag-name', 'FormRadioGroup');
    inputParent?.setAttribute('data-has-mutation', 'true');
  }, [nodePath, isForm, nodeId, prefixCls]);
  return {
    'data-node-id': nodeId,
    [$deletePropsList]: deletePropsList,
  };
}

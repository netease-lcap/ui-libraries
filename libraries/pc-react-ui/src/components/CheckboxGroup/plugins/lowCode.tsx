import React from 'react';
import { ConfigProvider } from 'antd';
import _ from 'lodash';
import FormContext from '@/components/Form/form-context';

import { $deletePropsList } from '@/plugins/constants';

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
    inputParent?.setAttribute('data-tag-name', 'FormCheckboxGroup');
    inputParent?.setAttribute('data-has-mutation', 'true');
  }, [prefixCls, isForm, nodePath, nodeId]);
  return {
    'data-node-id': nodeId,
    [$deletePropsList]: deletePropsList,
  };
}

export function useHandleEmptyOptions(props) {
  const optionsProps = props.get('options');
  const deletePropsList = props.get($deletePropsList);
  if (_.isEmpty(optionsProps)) deletePropsList.concat('options');
  return {
    [$deletePropsList]: deletePropsList,
  };
}

useHandleEmptyOptions.order = 5;

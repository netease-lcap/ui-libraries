import React from 'react';
import _ from 'lodash';
import { ConfigProvider } from 'antd';
import { $deletePropsList } from '@/plugins/constants';
import FormContext from '@/components/Form/form-context';

export function useHandleNodepath(props) {
  const nodepath = props.get('data-nodepath');
  const { isForm } = React.useContext(FormContext);
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls();
  const nodeid = _.uniqueId('inputNumber_');
  React.useEffect(() => {
    const inputNumber = document.querySelector(`[data-node-id=${nodeid}]`)?.closest(`.${prefix}-form-item-row`);
    inputNumber?.setAttribute('data-nodepath', nodepath);
    if (!isForm) return;
    inputNumber?.setAttribute('data-tag-name', 'FormInputNumber');
  }, []);
  return {
    'data-node-id': nodeid,
    [$deletePropsList]: deletePropsList,
  };
}
useHandleNodepath.order = 3;

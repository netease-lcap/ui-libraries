import React from 'react';
import { ConfigProvider } from 'antd';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleRef(props) {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls();
  const nodeId = _.uniqueId('table_');
  const deletePropsList = props.get($deletePropsList, []).concat(['data-nodepath']);
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const myTable = document.querySelector(`[data-node-id=${nodeId}]`)?.closest(`.${prefix}-table-wrapper`);
    myTable?.setAttribute('data-nodepath', nodePath);
  }, [nodeId]);
  return { [$deletePropsList]: deletePropsList, 'data-node-id': nodeId };
}

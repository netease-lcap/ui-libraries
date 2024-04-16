import _ from 'lodash';
import React from 'react';
import { ConfigProvider } from 'antd';

export function useHandleNodepath(props) {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls();
  const nodepath = props.get('data-nodepath');
  const nodeId = _.uniqueId('image_');
  const style = props.get('style');
  React.useEffect(() => {
    const element = document.querySelector(`[data-node-id=${nodeId}]`) as HTMLBodyElement;
    if (!element) return;
    element.style.width = '';
    element.removeAttribute('data-nodepath');
    element?.setAttribute('data-nodepath', nodepath);
  }, [style]);
  return {
    'data-node-id': nodeId,
    style,
  };
}

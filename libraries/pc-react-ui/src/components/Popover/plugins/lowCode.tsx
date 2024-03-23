import _ from 'lodash';
import React from 'react';
import { ConfigProvider } from 'antd';

export function useHandleNodePath(props) {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls();
  const nodePath = props.get('data-nodepath');
  const onOpenChangeProps = props.get('onOpenChange');
  return {
    onOpenChange: _.wrap(onOpenChangeProps, (onOpenChange, ...args) => {
      setTimeout(() => {
        const element = document.querySelectorAll(`.${prefix}-popover`);
        _.forEach(element, (item) => item.setAttribute('data-nodepath', nodePath));
      }, 1000);
      _.attempt(onOpenChangeProps, ...args);
    }),
  };
}

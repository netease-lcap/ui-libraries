import React from 'react';
import _ from 'lodash';

export function useHandleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  console.log('==========');
  React.useEffect(() => {
    const element = document.querySelectorAll('.ant-tabs-tab');
    console.log(element);
    _.forEach(element, (item) => item.setAttribute('data-nodepath', nodePath));
  }, []);
}

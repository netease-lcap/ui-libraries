import React from 'react';

export function useHandleNodepath(props) {
  const nodepath = props.get('data-nodepath');
  React.useEffect(() => {
    document.querySelector('#root')?.setAttribute('data-nodepath', nodepath);
  }, []);
  return {
    className: 'lcap-pro-layout',
    contentStyle: {
      background: '#fff',
    },
  };
}

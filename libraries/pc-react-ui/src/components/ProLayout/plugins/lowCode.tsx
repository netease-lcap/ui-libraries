/* eslint-disable consistent-return */
import React from 'react';

export function useHandleNodepath(props) {
  const nodepath = props.get('data-nodepath');
  const contentBackground = props.get('contentBackground', '#fff');
  React.useEffect(() => {
    if (!nodepath) return;
    document.querySelector('#root')?.setAttribute('data-nodepath', nodepath);
    return () => {
      document.querySelector('#root')?.removeAttribute('data-nodepath');
    };
  }, []);
  return {
    className: 'lcap-pro-layout',
    contentStyle: {
      background: contentBackground,
      minheight: '100%',
    },
  };
}

import React from 'react';

export function useHandleNodepath(props) {
  const BaseComponents = props.get('render');
  const render = React.useCallback((localProps) => {
    return <div data-nodepath={localProps['data-nodepath']}><BaseComponents {...localProps} /></div>;
  }, [BaseComponents]);
  return {
    render,
  };
}

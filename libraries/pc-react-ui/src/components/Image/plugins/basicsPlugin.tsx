import _ from 'lodash';
import React from 'react';

export function useHandleStyle(props) {
  const nodeId = _.uniqueId('image_');
  const style = props.get('style');
  React.useEffect(() => {
    // const element = document.querySelector(`[data-node-id]=${nodeId}`);
    const element = document.querySelector(`[data-node-id=${nodeId}]`);
    if (!element) return;
    _.entries(style).forEach(([key, value]) => {
      try {
        element.style[key] = style[key];
      } catch (error) {
        console.log(error);
      }
    });
  }, [style]);
  return {
    'data-node-id': nodeId,
    style,
  };
}

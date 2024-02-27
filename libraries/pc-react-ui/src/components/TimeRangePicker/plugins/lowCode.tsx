import React from 'react';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

function useHandleNodePath(props) {
  // const children = props.get('children');
  const id = _.uniqueId('contact_');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const mytab = document.querySelector(`[data-node-id=${id}]`);
    const pickerElement = mytab?.parentNode?.parentNode as Element;
    pickerElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    'data-node-id': id,
    [$deletePropsList]: deletePropsList,
  };
}

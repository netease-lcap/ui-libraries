import React from 'react';
import _ from 'lodash';
import {
  $labelKey, $valueKey, $dataSourceField, $deletePropsList,
} from '@/plugins/constants';

export function useHandleTransform(props) {
  return {
    [$deletePropsList]: props.get($deletePropsList, []).concat(['loading', 'dataSource']),
    [$dataSourceField]: 'items',
    [$labelKey]: 'label',
    [$valueKey]: 'key',
    valueField: 'key',
  };
}
export function useHandleTabPanNodePath(props) {
  const children = props.get('children');
  const id = _.uniqueId('contact_');
  React.useEffect(() => {
    const mytab = document.querySelector(`[data-node-id=${id}]`);
    const element = mytab?.querySelectorAll('.ant-tabs-tab');
    _.forEach(children, (item, index) => {
      const nodePath = _.get(item, 'props.data-nodepath');
      element?.[index]?.setAttribute('data-nodepath', nodePath);
    });
  }, [children]);
  return {
    'data-node-id': id,
  };
}

// export function useHandleRef(props) {
//   const reload = props.get('reload');
//   const ref = props.get('ref');
//   const myRef = React.useRef({});
//   React.useImperativeHandle(ref, () => ({
//     reload,
//     ...myRef.current,
//   }), [myRef, reload]);
//   return {};
// }
// useHandleRef.order = 6;

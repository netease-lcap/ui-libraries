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

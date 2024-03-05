import { useControllableValue, useWhyDidYouUpdate } from 'ahooks';
import React from 'react';
import _ from 'lodash';

function useHandleRef(props) {
  const ref = props.get('ref');
  const onChangeProps = props.get('onChange');
  const result = {
    onChange: _.wrap(onChangeProps, (fn, e) => {
      fn(e?.target?.value, e);
    }),
  };
  return _.isFunction(onChangeProps) ? result : {};
}
useHandleRef.order = 1;

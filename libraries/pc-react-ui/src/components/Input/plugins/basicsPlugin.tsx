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
export function useHandle(props) {
  // const mutableProps = props.get('mutableProps');
  const Compoent = props.get('render');
  function BasRender(selfProps) {
    const rowProps = ['gutter', 'align', 'justify', 'wrap'];
    return (
      <div key="div">
        123
        <Compoent key="com" {...selfProps} />
      </div>
    );
  }
  const render = React.useMemo(() => BasRender, []);
  // mutableProps.setState({ render: Add });
  return {
    render,
  };
}

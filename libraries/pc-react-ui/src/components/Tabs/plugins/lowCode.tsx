import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';

export function useHandleOpenRef(props) {
  const activeKey = props.get('activeKey');
  const defaultActiveKey = props.get('defaultActiveKey');
  const onChangeProps = props.get('onChange');
  const onActiveKeyChange = props.get('onActiveKeyChange', () => { });
  const ref = props.get('ref');
  const [value, setValue] = useControllableValue(_.filterUnderfinedValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    onChange: onChangeProps,
  }));
  const selfRef = React.useMemo(() => ({
    setValue,
    value,
    ...ref,
  }), [ref, setValue, value]);
  return {
    ref: selfRef,
    activeKey: value,
    onChange: (...e) => {
      setValue(...e);
      _.attempt(onActiveKeyChange, ...e);
    },
  };
}

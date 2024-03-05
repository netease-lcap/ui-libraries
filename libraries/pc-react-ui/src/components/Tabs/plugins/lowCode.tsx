import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';

// export function useHandleTabPanNodePath(props) {
//   const children = props.get('children');
//   const id = _.uniqueId('contact_');
//   React.useEffect(() => {
//     const mytab = document.querySelector(`[data-node-id=${id}]`);
//     const element = mytab?.querySelectorAll('.ant-tabs-tab');
//     _.forEach(children, (item, index) => {
//       const nodePath = _.get(item, 'props.data-nodepath');
//       element?.[index]?.setAttribute('data-nodepath', nodePath)o;
//     });
//   }, [children]);
//   return {
//     'data-node-id': id,
//   };
// }
export function useHandleOpenRef(props) {
  const activeKey = props.get('activeKey');
  const defaultActiveKey = props.get('defaultActiveKey');
  const onChangeProps = props.get('onChange');
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
    onChange: setValue,
  };
}

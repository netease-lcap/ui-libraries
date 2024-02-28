import React from 'react';
import _ from 'lodash';
import { useControllableValue } from 'ahooks';
import { $deletePropsList } from '@/plugins/constants';

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
export function useHandleOpenRef(props) {
  const activeKey = props.get('activeKey');
  const defaultActiveKey = props.get('defaultActiveKey');
  const onChangeProps = props.get('onChange');
  const ref = props.get('ref');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref']);
  const modalRef = React.useRef();
  const [value, setValue] = useControllableValue(_.filterUnderfinedValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    onChange: onChangeProps,
  }));
  React.useImperativeHandle(ref, () => ({
    setValue,
  }), [modalRef]);
  return {
    [$deletePropsList]: deletePropsList,
    value,
  };
}

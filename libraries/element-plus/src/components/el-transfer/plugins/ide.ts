/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('Transfer_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    node?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    formTagName: 'el-form-transfer',
    tagName: 'el-transfer',
  };
}
handleNodePath.type = $ide;

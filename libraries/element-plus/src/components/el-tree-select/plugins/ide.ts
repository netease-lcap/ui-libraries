/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('TreeSelect_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    node?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    formTagName: 'el-form-tree-select',
    tagName: 'el-tree-select',
  };
}
handleNodePath.type = $ide;

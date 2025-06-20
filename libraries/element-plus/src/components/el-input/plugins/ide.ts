import _ from 'lodash';

import { $deletePropsList, $ide, $tagName, $formTagName } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const formTagName = props.get($formTagName) || 'el-form-input';
  const tagName = props.get($tagName) || 'el-input';
  const nodeId = useMemo(() => _.uniqueId('Input_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const inputParent = node?.closest('.el-input') ?? node?.closest('el-textarea');
    inputParent?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    formTagName,
    tagName,
  };
}

handleNodePath.type = $ide;

/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $ide, $formTagName, $tagName } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const nodeId = useMemo(() => _.uniqueId('Cascader_'), []);
  const formTagName = props.get($formTagName) || 'el-form-cascader';
  const tagName = props.get($tagName) || 'el-cascader';
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    node?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    formTagName,
    tagName,
  };
}

handleNodePath.type = $ide;

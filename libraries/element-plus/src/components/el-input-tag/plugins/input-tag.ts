import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import { useEffect, useMemo, useState } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('InputTag_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const inputTagElement = node?.closest('.el-input-tag');
    inputTagElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
  };
}

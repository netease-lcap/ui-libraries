import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('InputNumber_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const inputNumberElement = node?.closest('.el-input-number');
    inputNumberElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
  };
}

handleNodePath.type = $ide;

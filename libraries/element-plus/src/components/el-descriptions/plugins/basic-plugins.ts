import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath') || '3333';

  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('Descriptions_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const descriptionsElement = node?.closest('.el-descriptions');
    descriptionsElement?.setAttribute('data-nodepath', nodePath);
  }, []);

  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
  };
}

handleNodePath.type = $ide;

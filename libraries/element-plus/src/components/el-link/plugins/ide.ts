import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

 function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('Link_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const linkElement = node?.closest('.el-link');
    linkElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
  };
}
handleNodePath.type = $ide;

import _ from 'lodash';
import { useEffect, useMemo } from '@/plugins/hooks';

import { $deletePropsList, $ide } from '@/plugins/constants';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('TimePicker_'), []);
  const isRange = props.get('isRange');
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const inputNumberElement = node?.closest('.el-date-editor');
    inputNumberElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    'is-range': isRange,
    formTagName: 'el-form-time-picker',
  };
}

handleNodePath.type = $ide;

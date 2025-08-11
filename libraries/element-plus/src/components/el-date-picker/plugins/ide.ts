/* 仅在 ide 环境生效的插件 */
import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const vusionD2cId = props.get('vusion-d2c-id');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath', 'vusion-d2c-id');
  const nodeId = useMemo(() => _.uniqueId('DatePicker_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    node?.setAttribute('data-nodepath', nodePath);
    node?.setAttribute('vusion-d2c-id', vusionD2cId);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    formTagName: 'el-form-date-picker',
    tagName: 'el-date-picker',
  };
}
handleNodePath.type = $ide;

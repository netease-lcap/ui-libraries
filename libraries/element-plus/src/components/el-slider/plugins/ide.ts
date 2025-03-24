import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

 function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
  const nodeId = useMemo(() => _.uniqueId('Slider_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    const sliderElement = node?.closest('.el-slider');
    sliderElement?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    [$deletePropsList]: deletePropsList,
    formTagName: 'el-form-slider',
  };
}

handleNodePath.type = $ide;

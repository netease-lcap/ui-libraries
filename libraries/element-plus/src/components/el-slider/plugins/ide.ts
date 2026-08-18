import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const SliderAccumulate = new PluginAccumulateTypes<nasl.ui.ElSliderOptions<any, any, any, any, any>, IIdePluginBase>();
export default SliderAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle(props) {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('Slider_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      node?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

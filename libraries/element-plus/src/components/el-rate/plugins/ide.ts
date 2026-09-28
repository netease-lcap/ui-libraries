import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const RateAccumulate = new PluginAccumulateTypes<nasl.ui.ElRateOptions, IIdePluginBase>();
export default RateAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle(props) {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('Rate_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const rateElement = node?.closest('.el-rate');
      rateElement?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

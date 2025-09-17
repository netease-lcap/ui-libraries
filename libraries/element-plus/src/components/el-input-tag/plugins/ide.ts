import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const InputTagIdeAccumulate = new PluginAccumulateTypes<nasl.ui.ElInputTagOptions, IIdePluginBase>();
export default InputTagIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('InputTag_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const inputTagElement = node?.closest('.el-input-tag') ?? node;
      inputTagElement?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const InputNumberIdeAccumulate = new PluginAccumulateTypes<nasl.ui.ElInputNumberOptions, IIdePluginBase>();
export default InputNumberIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('InputNumber_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const inputNumberElement = node?.closest('.el-input-number') ?? node;
      inputNumberElement?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

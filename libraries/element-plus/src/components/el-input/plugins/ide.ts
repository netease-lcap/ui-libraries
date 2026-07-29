import _ from 'lodash';

import { $deletePropsList, $ide, $tagName, $formTagName } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const InputIdeAccumulate = new PluginAccumulateTypes<nasl.ui.ElInputOptions, IIdePluginBase>();
export default InputIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('Input_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const inputParent = node?.closest('.el-input') ?? node?.closest('.el-textarea') ?? node;
      inputParent?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const SwitchAccumulate = new PluginAccumulateTypes<nasl.ui.ElSwitchOptions, IIdePluginBase>();
export default SwitchAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle(props) {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('Switch_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const switchElement = node?.closest('.el-switch') ?? node;
      switchElement?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const TreeSelectIdeAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTreeSelectOptions<any, any, any, any, any>,
  IIdePluginBase
>();
export default TreeSelectIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle(props) {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
    const nodeId = useMemo(() => _.uniqueId('TreeSelect_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      node?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
      [$deletePropsList]: deletePropsList,
    };
  },
});

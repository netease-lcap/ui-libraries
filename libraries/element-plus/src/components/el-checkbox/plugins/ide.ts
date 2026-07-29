/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types/pluginBase';

const CheckboxIdeAccumulate = new PluginAccumulateTypes<object, IIdePluginBase>();

export default CheckboxIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
    const nodeId = useMemo(() => _.uniqueId('CheckboxGroup_'), []);
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

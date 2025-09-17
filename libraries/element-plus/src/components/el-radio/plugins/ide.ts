/* eslint-disable no-shadow */
import _ from 'lodash';
import { RadioProps } from 'element-plus';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const RadioAccumulate = new PluginAccumulateTypes<nasl.ui.ElRadioOptions<any, any>, IIdePluginBase>();
export default RadioAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle(props) {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
    const nodeId = useMemo(() => _.uniqueId('RadioGroup_'), []);
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

/* 仅在 ide 环境生效的插件 */
import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const MentionIdeAccumulate = new PluginAccumulateTypes<nasl.ui.ElMentionOptions<any, any>, IIdePluginBase>();
export default MentionIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const myClass = props.get('class', '');
    const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
    const nodeId = useMemo(() => _.uniqueId('Input_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const inputParent = node?.closest('.el-mention') ?? node;
      inputParent?.setAttribute('data-nodepath', nodePath);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
      [$deletePropsList]: deletePropsList,
      formTagName: 'el-form-mention',
      tagName: 'el-mention',
    };
  },
});

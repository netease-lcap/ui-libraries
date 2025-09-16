/* eslint-disable no-shadow */
import _ from 'lodash';
import { $formTagName, $tagName } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes, ConvertPluginTypes } from '@/plugins/accumulate';
import { IIdePluginBase, PluginBase } from '@/types';

const CascaderAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElCascaderOptions<any, any, any, any, any>,
  IIdePluginBase
>();

export default CascaderAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const vusionD2cId = props.get('vusion-d2c-id');
    const myClass = props.get('class');
    const nodeId = useMemo(() => _.uniqueId('Cascader_'), []);
    const formTagName = props.get($formTagName) || 'el-form-cascader';
    const tagName = props.get($tagName) || 'el-cascader';
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      node?.setAttribute('data-nodepath', nodePath);
      node?.setAttribute('vusion-d2c-id', vusionD2cId);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
      formTagName,
      tagName,
    };
  },
});

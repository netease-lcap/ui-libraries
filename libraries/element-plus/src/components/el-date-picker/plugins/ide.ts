/* 仅在 ide 环境生效的插件 */
import _ from 'lodash';
import { useEffect, useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const DatePickerIdeAccumulate = new PluginAccumulateTypes<object, IIdePluginBase>();

export default DatePickerIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle: (props) => {
    const nodePath = props.get('data-nodepath');
    const vusionD2cId = props.get('vusion-d2c-id');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('DatePicker_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      node?.setAttribute('data-nodepath', nodePath);
      node?.setAttribute('vusion-d2c-id', vusionD2cId);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

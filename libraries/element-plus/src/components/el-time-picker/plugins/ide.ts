import _ from 'lodash';
import { useEffect, useMemo } from '@/plugins/hooks';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

const TimePickerIdeAccumulate = new PluginAccumulateTypes<nasl.ui.ElTimePickerOptions, IIdePluginBase>();
export default TimePickerIdeAccumulate.addPlugin({
  name: 'handleNodePath',
  type: 'ide',
  handle(props) {
    const nodePath = props.get('data-nodepath');
    const vusionD2cId = props.get('vusion-d2c-id');
    const myClass = props.get('class', '');
    const nodeId = useMemo(() => _.uniqueId('TimePicker_'), []);
    useEffect(() => {
      const node = document.querySelector(`.${nodeId}`);
      const inputNumberElement = node?.closest('.el-date-editor') ?? node;
      inputNumberElement?.setAttribute('data-nodepath', nodePath);
      inputNumberElement?.setAttribute('vusion-d2c-id', vusionD2cId);
    }, []);
    return {
      class: `${myClass} ${nodeId}`,
    };
  },
});

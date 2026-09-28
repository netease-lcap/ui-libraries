/* 组件功能扩展插件 */
import _ from 'lodash';
import { ResultProps } from 'element-plus';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const ResultBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElResultOptions, ResultProps>();
export default ResultBasicAccumulate.addPlugin({
  name: 'handleSlots',
  handle(props) {
    const slots = props.get('slots');

    return {
      slots: _.assign(slots, {
        'sub-title': slots.subTitle ?? slots['sub-title'],
      }),
    };
  },
});

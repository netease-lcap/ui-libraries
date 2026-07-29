/* 组件功能扩展插件 */
import { ElTooltipProps } from 'element-plus';
import _ from 'lodash';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const TooltipBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTooltipOptions, ElTooltipProps>();
export default TooltipBasicAccumulate.addPlugin({
  name: 'handlePoperWidth',
  handle(props) {
    const popperWidth = props.get('popperWidth');
    const poperStyle = props.get('popperStyle');
    return {
      popperStyle: _.assign(poperStyle, {
        width: `${popperWidth}px`,
      }),
    };
  },
});

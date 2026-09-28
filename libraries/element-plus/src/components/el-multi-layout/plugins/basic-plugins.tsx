/* 组件功能扩展插件 */
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const MultiLayoutPluginAccumulate = new PluginAccumulateTypes<nasl.ui.ElMultiLayoutOptions, object>();
export default MultiLayoutPluginAccumulate.addPlugin({
  name: 'handleLayout',
  handle(props) {
    const myClass = props.get('class', '');
    return {
      class: `${myClass} el-multi-layout`,
    };
  },
});

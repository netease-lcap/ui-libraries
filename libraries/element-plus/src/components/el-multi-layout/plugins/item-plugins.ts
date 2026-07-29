import { PluginAccumulateTypes } from '@/plugins/accumulate';

const MultiLayoutItemPluginAccumulate = new PluginAccumulateTypes<nasl.ui.ElMultiLayoutItemOptions, object>();
export default MultiLayoutItemPluginAccumulate.addPlugin({
  name: 'handleLayout',
  handle(props) {
    const myClass = props.get('class', '');
    return {
      class: `${myClass} el-multi-layout-item`,
    };
  },
});

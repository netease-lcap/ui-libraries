import { PluginAccumulateTypes } from '@/plugins/accumulate';

const MultiLayoutMainHeadPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElMultiLayoutMainHeadOptions,
  object
>();
export default MultiLayoutMainHeadPluginAccumulate.addPlugin({
  name: 'handleLayout',
  handle(props) {
    const myClass = props.get('class', '');
    return {
      class: `${myClass} el-multi-layout-main-head`,
    };
  },
});

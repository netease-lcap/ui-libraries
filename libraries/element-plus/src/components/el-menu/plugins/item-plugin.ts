import _ from 'lodash';
import { MenuItemProps } from 'element-plus';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const ItemPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElMenuItemGroupOptions,
  MenuItemProps & { destination: string }
>();
export default ItemPluginAccumulate.addPlugin({
  name: 'handleIndex',
  handle(props) {
    const index = props.get('index');
    const destination = props.get('destination');
    return {
      index: index || destination || _.uniqueId('el-menu-item-'),
    };
  },
});

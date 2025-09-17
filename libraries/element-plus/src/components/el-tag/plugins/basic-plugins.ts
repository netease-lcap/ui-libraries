// /* 组件功能扩展插件 */
import _ from 'lodash';
import { TagProps } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const TagBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElTagOptions, TagProps>();
export default TagBasicAccumulate.addPlugin({
  name: 'useTextToSlot',
  handle(props) {
    const text = props.get('text');
    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat(['text']);
    return {
      slots: _.defaults(slots, {
        default: () => text,
      }),
      [$deletePropsList]: deletePropsList,
    };
  },
});

/* 组件功能扩展插件 */
import _ from 'lodash';
import { CollapseItemProps } from 'element-plus';
import { useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const CollapseItemAccumulate = new PluginAccumulateTypes<nasl.ui.ElCollapseItemOptions, CollapseItemProps>();

export default CollapseItemAccumulate.addPlugin({
  name: 'handleSlots',
  handle: (props) => {
    const slots = props.get('slots');
    const titleSlot = slots.title;
    const wrappedSlots = useMemo(
      () => (_.isNil(titleSlot)
          ? {}
          : {
              title: ({ isActive }) => <div class="el-collapse-item__title">{titleSlot?.({ isActive })}</div>,
            }),
      [titleSlot],
    );

    return {
      slots: _.assign({}, slots, wrappedSlots),
    };
  },
});

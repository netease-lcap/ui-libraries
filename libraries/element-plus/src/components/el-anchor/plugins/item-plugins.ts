/* 组件功能扩展插件 */
import _ from 'lodash';
import { AnchorLinkProps } from 'element-plus/es/components/anchor/src/anchor-link';

import { PluginAccumulateTypes } from '@/plugins/accumulate';

const AnchorLinkAccumulate = new PluginAccumulateTypes<nasl.ui.ElAnchorLinkOptions, AnchorLinkProps>();

export default AnchorLinkAccumulate.addPlugin({
  name: 'handleSlots',
  handle: (props) => {
    const slots = props.get('slots');

    return {
      slots: _.assign(slots, {
        'sub-link': slots.subLink,
      }),
    };
  },
});

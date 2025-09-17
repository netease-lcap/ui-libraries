import _ from 'lodash';
import { DescriptionItemProps } from 'element-plus';
import { useEffect } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const DescriptionsItemAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElDescriptionsItemOptions,
  DescriptionItemProps & { contentClassName: string }
>();

export default DescriptionsItemAccumulate.addPlugin({
  name: 'handleDefaultSlot',
  handle: (props) => {
    const slots = props.get('slots');
    return {
      render: slots?.default,
    };
  },
}).addPlugin({
  name: 'handleStyle',
  handle: (props) => {
    const contentClassName = props.get('contentClassName');
    const style = props.get('style');
    useEffect(() => {
      const nodes = document.querySelectorAll(`.${contentClassName}`);
      if (!nodes) return;
      _.forEach(_.keys(style), (key) => {
        _.forEach(nodes, (node) => {
          (node as HTMLElement).style[key] = style[key];
        });
      });
    }, [contentClassName, style]);
    return {};
  },
});

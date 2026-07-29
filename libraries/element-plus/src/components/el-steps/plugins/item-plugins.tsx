import { StepProps } from 'element-plus';
import { ElIcon } from '../../index';

import { PluginAccumulateTypes } from '@/plugins/accumulate';

const ElStepAccumulate = new PluginAccumulateTypes<nasl.ui.ElStepOptions, StepProps>();
export default ElStepAccumulate.addPlugin({
  name: 'handleIcon',
  handle(props) {
    const icon = props.get('icon');
    const slots = props.get('slots');
    if (!icon) return {};

    const iconSlot = {
      icon: () => {
        return <ElIcon name={icon} />;
      },
    };

    return {
      slots: {
        ...slots,
        ...iconSlot,
      },
    };
  },
});

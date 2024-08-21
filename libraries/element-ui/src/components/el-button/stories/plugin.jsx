import { $deletePropList, $render, $ref } from '@lcap/vue2-utils/plugins';
import ElTooltip from 'element-ui/lib/tooltip';

export const useTooltip = {
  props: ['tooltip'],
  setup: (props) => {
    const renderToolTip = (resultVNode, h) => {
      const tooltip = props.get('tooltip');
      const disabled = props.get('disabled');

      if (!tooltip || disabled) {
        return resultVNode;
      }

      const tooltipProps = typeof tooltip === 'string' ? { content: tooltip } : { ...tooltip };

      return <ElTooltip { ...{ props: {...tooltipProps} }} >{resultVNode}</ElTooltip>;
    };

    return {
      class: '4344923',
      style: {
        minWidth: `100px`,
      },
      [$render]: renderToolTip,
    };
  },
};

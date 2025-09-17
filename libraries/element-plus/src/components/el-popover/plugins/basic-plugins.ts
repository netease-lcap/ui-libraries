import { PopoverProps } from 'element-plus';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const PopoverBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElPopoverOptions, PopoverProps>();
export default PopoverBasicAccumulate.addPlugin({
  name: 'handlePopperClass',
  handle(props) {
    const popperClassProp = props.get('popperClass');
    const setClass = props.get('class');

    return {
      popperClass: `${popperClassProp} ${setClass}`,
    };
  },
});

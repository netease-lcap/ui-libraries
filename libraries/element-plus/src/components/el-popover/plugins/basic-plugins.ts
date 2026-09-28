import { PopoverProps } from 'element-plus';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { useControllableValue } from '@/plugins/hooks';

const PopoverBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElPopoverOptions, PopoverProps>();
export default PopoverBasicAccumulate.addPlugin({
  name: 'handlePopperClass',
  handle(props) {
    const popperClassProp = props.get('popperClass');
    const [, setVisible, valueProps] = useControllableValue(props, {
      valuePropName: 'visible',
    });
    const setClass = props.get('class');

    return {
      popperClass: `${popperClassProp} ${setClass}`,
      ...valueProps,
      ref: {
        show: () => setVisible(true),
        hide: () => setVisible(false),
      },
    };
  },
});

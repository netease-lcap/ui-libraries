import Button from 'element-ui/lib/button';
import ButtonGroup from 'element-ui/lib/button-group';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElButton = registerComponent(Button, plugins, {
  nativeEvents: [
    'mouseenter', 'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave', 'focus', 'blur',
  ],
});

export const ElButtonGroup = ButtonGroup;
export default ElButton;

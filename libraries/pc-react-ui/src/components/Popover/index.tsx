import { Popover as AntdPopover } from 'antd';
import type { PopoverProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const mapProps = {
  mySize: 'size',
};

export const Popover = registerComponet<
  PopoverProps,
  pluginType<PopoverProps>
>(
  AntdPopover,
  { plugin, displayName: AntdPopover.displayName, mapProps },
);

// export default Popover;

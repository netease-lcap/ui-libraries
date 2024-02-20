import { Tooltip as AntdTooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const mapProps = {
  mySize: 'size',
};

export const Tooltip = registerComponet<
  TooltipProps,
  pluginType<TooltipProps>
>(
  AntdTooltip,
  { plugin, displayName: AntdTooltip.displayName, mapProps },
);

// export default Tooltip;

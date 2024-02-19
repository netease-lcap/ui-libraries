import { Flex as AntdFlex } from 'antd';
import type { FlexProps } from 'antd';
import { registerComponet, Plugin } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const mapProps = {
  mySize: 'size',
};

// const myPlugin = new Plugin({ plugin, displayName: 'Flex', mapProps });
const Flex = registerComponet<
  FlexProps,
  pluginType<FlexProps>
>(
  AntdFlex,
  { plugin, displayName: 'Flex', mapProps },
);

export default Flex;

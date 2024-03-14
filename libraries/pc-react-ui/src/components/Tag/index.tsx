import './theme/vars.css';
import { Tag as AntdTag } from 'antd';
import type { TagProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Tag = registerComponet<
  TagProps,
  pluginType<TagProps>
>(
  AntdTag,
  { plugin, displayName: AntdTag.displayName, mapProps },
);

// export default Tag;

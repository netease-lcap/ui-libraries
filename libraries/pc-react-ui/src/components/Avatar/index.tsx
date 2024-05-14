import {
  Avatar as AntdAvatar,
} from 'antd';
import type { AvatarProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Avatar = registerComponet<
  AvatarProps,
  AvatarProps
>(
  AntdAvatar,
  { plugin, displayName: AntdAvatar.displayName, mapProps },
);

// export default Image;

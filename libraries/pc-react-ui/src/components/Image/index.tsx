import './theme/vars.css';
import { Image as AntdImage } from 'antd';
import type { ImageProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Image = registerComponet<
  ImageProps,
  ImageProps
// pluginType<ImageProps>
>(
  AntdImage,
  { plugin, displayName: AntdImage.displayName, mapProps },
);
Image.defaultProps = {
  preview: false,
  fallback: 'xxx/xxxx.jpg',
};

// export default Image;

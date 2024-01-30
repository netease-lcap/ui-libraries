import { Upload as AntdUpload } from 'antd';
import type { UploadProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Upload = registerComponet<
  UploadProps,
  pluginType<UploadProps>
>(
  AntdUpload,
  { plugin, displayName: AntdUpload.displayName, mapProps },
);

export default Upload;

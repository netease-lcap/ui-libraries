import { Radio as AntdRadio } from 'antd';
import type { RadioProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Radio = registerComponet<
  RadioProps,
  pluginType<RadioProps>
>(
  AntdRadio,
  { plugin, displayName: AntdRadio.displayName, mapProps },
);

export default Radio;

export const RadioGroup = AntdRadio.Group;
export const RadioButton = AntdRadio.Button;

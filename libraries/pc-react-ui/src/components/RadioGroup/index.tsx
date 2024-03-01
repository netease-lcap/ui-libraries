import { Radio as AntdRadio } from 'antd';
import type { RadioProps, RadioGroupProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as groupPlugin from './plugins/groupPlugin';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Radio = registerComponet<
  RadioProps,
  pluginType<RadioProps>
>(
  AntdRadio,
  { plugin, displayName: AntdRadio.displayName, mapProps },
);

// export default Radio;

// export const RadioGroup = AntdRadio.Group;
export const RadioButton = AntdRadio.Button;
export const RadioGroup = registerComponet<
  RadioGroupProps,
  pluginType<RadioGroupProps>
>(
  AntdRadio.Group,
  { plugin: groupPlugin, displayName: AntdRadio.Group.displayName, mapProps },
);

import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as groupPlugin from './plugins/groupPlugin';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Checkbox = registerComponet<
  CheckboxProps,
  pluginType<CheckboxProps>
>(
  AntdCheckbox,
  { plugin, displayName: AntdCheckbox.displayName, mapProps },
);

export const checkboxGroup = registerComponet<
  CheckboxProps,
  pluginType<CheckboxProps>
>(
  AntdCheckbox.Group,
  { groupPlugin, displayName: AntdCheckbox.Group.displayName, mapProps },
);

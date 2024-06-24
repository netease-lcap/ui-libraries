import { Checkbox as AntdCheckbox } from 'antd';

import { ProFormCheckbox, ProFormCheckboxGroupProps } from '@ant-design/pro-components';
import type { CheckboxProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as groupPlugin from './plugins/groupPlugin';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // mySize: 'size',
};

export const Checkbox = registerComponet<
  CheckboxProps,
  pluginType<CheckboxProps>
>(
  AntdCheckbox,
  { plugin, displayName: AntdCheckbox.displayName, mapProps },
);

export const CheckboxGroup = registerComponet<
  CheckboxProps,
  ProFormCheckboxGroupProps
>(
  AntdCheckbox.Group,
  { plugin: groupPlugin, displayName: 'CheckboxGroup', mapProps },
);
// export const CheckboxGroup = AntdCheckbox.Group;

// export const Checkbox = AntdCheckbox;

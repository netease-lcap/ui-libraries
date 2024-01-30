import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Checkbox = registerComponet<
  CheckboxProps,
  pluginType<CheckboxProps>
>(
  AntdCheckbox,
  { plugin, displayName: AntdCheckbox.displayName, mapProps },
);

export default Checkbox;
export const checkboxGroup = AntdCheckbox.Group;
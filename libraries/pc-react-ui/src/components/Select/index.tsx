import { Select as AntdSelect, Menu } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd/lib/select';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';
// import { registerComponet } from '../../plugins/index';
// import moduleName from '@plugins/';

import './index.module.less';

console.log(Menu, 'Menu');

type SelectProps = AntdSelectProps

const mapProps = {
  mySize: 'size',
};

const Select = registerComponet<SelectProps, pluginType<SelectProps>>(
  AntdSelect,
  { plugin, displayName: 'select', mapProps },
);

export default Select;

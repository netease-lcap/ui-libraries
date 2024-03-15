import { Select as AntdSelect } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as formSelectPlugin from './plugins/formSelect';
import type { pluginType } from '@/plugins/type';
// import { registerComponet } from '../../plugins/index';
// import moduleName from '@plugins/';

import './index.module.less';

type SelectProps = AntdSelectProps

const mapProps = {
  // mySize: 'size',
  // dataSource: 'options',
};

export const Select = registerComponet<SelectProps, pluginType<SelectProps>>(
  AntdSelect,
  { plugin, displayName: AntdSelect.displayName, mapProps },
);
export const FormSelect = registerComponet<SelectProps, pluginType<SelectProps>>(
  AntdSelect,
  { plugin: formSelectPlugin, displayName: AntdSelect.displayName, mapProps },
);

// export default Select;
export const SelectOption = AntdSelect.Option;

export const SelectOptGroup = AntdSelect.OptGroup;

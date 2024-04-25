import { Select as AntdSelect } from 'antd';
import type { SelectProps as AntdSelectProps } from 'antd';
import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
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

export const Select = registerComponet<SelectProps, ProFormSelectProps>(
  ProFormSelect,
  { plugin, displayName: AntdSelect.displayName, mapProps },
);
Select.defaultProps = {
  fieldProps: {
    optionFilterProp: 'label',
  },
};
export const FormSelect = registerComponet<SelectProps, pluginType<SelectProps>>(
  AntdSelect,
  { plugin: formSelectPlugin, displayName: AntdSelect.displayName, mapProps },
);

// export default Select;
export const SelectOption = AntdSelect.Option;

export const SelectOptGroup = AntdSelect.OptGroup;

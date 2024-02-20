// import { ProForm as AntdForm } from '@ant-design/pro-components';
import { Form as AntdForm, FormProps } from 'antd';
// import { FormProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Form = registerComponet<
  FormProps,
  pluginType<FormProps>
>(
  AntdForm,
  { plugin, displayName: AntdForm.displayName, mapProps },
);

// export default Form;

export const FormItem = AntdForm.Item;
export const FormList = AntdForm.List;
// export const FormItemProps = AntdForm.ItemProps;
// export const FormLGroup = AntdForm.Group;

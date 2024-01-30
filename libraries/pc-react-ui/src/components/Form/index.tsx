import { ProForm as AntdForm } from '@ant-design/pro-components';
import type { ProFormProps } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Form = registerComponet<
  ProFormProps,
  pluginType<ProFormProps>
>(
  AntdForm,
  { plugin, displayName: 'descriptions', mapProps },
);

export default Form;

export const FormItem = AntdForm.Item;
export const FormLGroup = AntdForm.Group;

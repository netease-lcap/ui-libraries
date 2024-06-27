// import { ProForm } from '@ant-design/pro-components';
import { Form as AntdForm, FormProps, FormItemProps } from 'antd';
// import { FormProps } from 'antd';
import {
  QueryFilter, QueryFilterProps, ProForm, ProFormProps,
} from '@ant-design/pro-components';
import VusionValidator, { localizeRules } from '@lcap/validator';
import _ from 'lodash';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as formItemPlugin from './plugins/formItemPlugin';

import * as queryFromPlugin from './plugins/queryFromPlugin';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // mySize: 'size',
};

export const Form = registerComponet<
  FormProps,
  ProFormProps
>(
  ProForm,
  { plugin, displayName: AntdForm.displayName, mapProps },
);
Form.defaultProps = {
  layout: 'horizontal',
  autoFocusFirstInput: false,
};

export const FormItem = registerComponet<
  FormItemProps,
  FormItemProps
>(
  AntdForm.Item,
  {
    plugin: {
      useHandleRul(props) {
        const rules = props.get('rules');
        return {
          rules: _.map(rules, (item) => {
            return {
              message: item.message,
              required: item.required,
              validateTrigger: ['onChange', 'onBlur'],
              ...item,
              validator: (rule, value) => {
                const validator = new VusionValidator(undefined, localizeRules, [rule]);
                return validator.validate(value);
              },
            };
          }),

        };
      },
    },
    displayName: 'FormItem',
    mapProps,
  },
);

export const QueryForm = registerComponet<
  QueryFilterProps,
  QueryFilterProps
>(
  QueryFilter,
  { plugin: queryFromPlugin, displayName: 'QueryForm', mapProps },
);

export const FormList = AntdForm.List;

import { Cascader as AntdCascader } from 'antd';
import React from 'react';

import { ProFormCascader, ProFormCaptchaProps } from '@ant-design/pro-components';
import type { CascaderProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // dataSource: 'options',
};

export const Cascader = registerComponet<
  ProFormCaptchaProps,
  CascaderProps
>(
  AntdCascader,
  { plugin, displayName: AntdCascader.displayName, mapProps },
);

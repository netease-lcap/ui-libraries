/* eslint-disable react/prop-types */
import React from 'react';
// import { Layout as AntdTag } from 'antd';
// import type { LayoutProps } from 'antd';
import classnames from 'classnames';
// import { registerComponet } from '@/plugins/index';
// import * as plugin from './plugins';
// import type { pluginType } from '@/plugins/type';

import style from './index.module.less';

export function AbsoluteLayout(props) {
  const className = classnames(style.input, props?.className);
  return <div {...props} className={className} />;
}

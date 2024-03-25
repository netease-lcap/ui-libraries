/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
// import { Tag as AntdTag } from 'antd';
import React from 'react';
import { message as AntdMessage } from 'antd';
import type { ArgsProps } from 'antd/lib/message';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

function ToastMessageFragment(props) {
  const ref = props.get('ref');
  const content = props.get('content');
  const duration = props.get('duration');
  const onClose = props.get('onClose');
  const type = props.get('type');
  const [messageApi, contextHolder] = AntdMessage.useMessage();
  React.useImperativeHandle(ref, () => {
    return {
      ...messageApi,
      success: (content, duration, onClose) => {
        messageApi.success(content, duration, onClose);
      },
      error: (content, duration, onClose) => {
        messageApi.error(content, duration, onClose);
      },
      info: (content, duration, onClose) => {
        messageApi.info(content, duration, onClose);
      },
      warning: (content, duration, onClose) => {
        messageApi.warning(content, duration, onClose);
      },
      loading: (content, duration, onClose) => {
        messageApi.loading(content, duration, onClose);
      },
      open: (...args) => {
        messageApi.open({
          content,
          type,
          duration,
          onClose,
          ...args,
        });
      },
    };
  });
  return <div>{contextHolder}</div>;
}
ToastMessageFragment.displayName = 'message';
export const ToastMessage = registerComponet<
  ArgsProps,
  pluginType<ArgsProps>
>(
  ToastMessageFragment,
  { plugin, displayName: ToastMessageFragment.displayName, mapProps },
);

// export default ToastMessage;
export const message = AntdMessage;

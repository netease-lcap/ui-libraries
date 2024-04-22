import { Modal as AntdModal } from 'antd';
import React from 'react';
import type { ModalProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Modal = registerComponet<
  ModalProps,
  pluginType<ModalProps>
>(
  AntdModal,
  { plugin, displayName: 'Modal', mapProps },
);

// export default Modal;
// export function Add(props) {
//   const { children } = props;
//   return (

//     <div>

//       {children}
//     </div>
//   );
// }

import { Modal as AntdModal } from 'antd';
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
  { plugin, displayName: AntdModal.displayName, mapProps },
);

// export default Modal;

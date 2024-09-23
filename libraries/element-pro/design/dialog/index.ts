import _Dialog from './dialog';
import withInstall from '../utils/withInstall';
import { ElDialogProps } from './type';

import './style';

export * from './type';
export type DialogProps = ElDialogProps;

export const Dialog = withInstall(_Dialog);
export { default as DialogPlugin } from './plugin';
export default Dialog;

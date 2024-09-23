import _Popup from './popup';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { ElPopupProps } from './type';

import './style';

export type PopupProps = ElPopupProps;
export * from './type';
export * from './plugin';

export const Popup = withInstall(
  mapProps(['visible'], { model: { prop: 'visible', event: 'visible-change' } })(_Popup),
);

export default Popup;

import _Switch from './switch';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { ElSwitchProps } from './type';

import './style';

export * from './type';
export type SwitchProps = ElSwitchProps;

export const Switch = withInstall(mapProps(['value'], {
  model: { prop: 'value', event: 'change' },
})(_Switch));

export default Switch;

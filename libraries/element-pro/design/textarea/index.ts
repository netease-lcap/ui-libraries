import _Textarea from './textarea';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { ElTextareaProps } from './type';

import './style';

export type TextareaProps = ElTextareaProps;
export * from './type';
export const Textarea = withInstall(mapProps(['value'])(_Textarea));
export default Textarea;

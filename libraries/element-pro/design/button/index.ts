import _Button from './button';
import withInstall from '../utils/withInstall';
import { ElButtonProps } from './type';

import './style';

export * from './type';
export type ButtonProps = ElButtonProps;
export const Button = withInstall(_Button);
export default Button;

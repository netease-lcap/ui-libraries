import _Link from './link';
import withInstall from '../utils/withInstall';
import { ElLinkProps } from './type';

import './style';

export * from './type';
export type LinkProps = ElLinkProps;
export const Link = withInstall(_Link);
export default Link;

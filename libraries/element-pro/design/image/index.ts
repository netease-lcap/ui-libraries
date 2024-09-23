import _Image from './image';
import mapProps from '../utils/map-props';
import withInstall from '../utils/withInstall';
import { ElImageProps } from './type';

import './style';

export type ImageProps = ElImageProps;
export * from './type';

export const Image = withInstall(mapProps(['value'])(_Image));
export default Image;

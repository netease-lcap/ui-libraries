import _ImageViewer from './image-viewer';
import withInstall from '../utils/withInstall';
import { ElImageViewerProps } from './type';

import './style';

export * from './type';
export type ImageViewerProps = ElImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;

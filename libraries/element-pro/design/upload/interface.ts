import { ElUploadProps, UploadRemoveContext } from './type';
import { GlobalConfigProvider } from '../config-provider/type';
import { ElNode } from '../common';
import { ImageViewerProps } from '../image-viewer';

export interface CommonDisplayFileProps {
  accept: string;
  files: ElUploadProps['files'];
  toUploadFiles: ElUploadProps['files'];
  displayFiles: ElUploadProps['files'];
  theme: ElUploadProps['theme'];
  abridgeName: ElUploadProps['abridgeName'];
  placeholder: ElUploadProps['placeholder'];
  classPrefix: string;
  tips?: ElUploadProps['tips'];
  status?: ElUploadProps['status'];
  locale?: GlobalConfigProvider['upload'];
  sizeOverLimitMessage?: string;
  autoUpload?: boolean;
  disabled?: boolean;
  uploading?: boolean;
  tipsClasses?: string;
  errorClasses?: string[];
  placeholderClass?: string;
  showUploadProgress?: boolean;
  xhrReq?: XMLHttpRequest;
  default?: ElNode;
  fileListDisplay?: ElUploadProps['fileListDisplay'];
  onRemove?: (p: UploadRemoveContext) => void;
  imageViewerProps?: ImageViewerProps;
}

export type UploadProps = ElUploadProps;

import { UploaderFileListItem } from 'vant';

// 扩展类型定义
export type ExtendedUploaderFileListItem = Omit<UploaderFileListItem, 'status'> & {
  status?: 'uploading' | 'done' | 'error' | 'failed' | 'success';
  response?: any;
  percent?: number;
  name?: string;
};

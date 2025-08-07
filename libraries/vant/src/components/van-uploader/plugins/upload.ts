import { unref } from 'vue';
import _ from 'lodash';
import { ExtendedUploaderFileListItem } from './types';
import ajax from './ajax';

/**
 * 处理文件名
 * @param url 文件路径
 * @returns 文件名
 */
function handleFileName(url: string) {
  const newFileNameMatch = url.match(/[?&]fileName=([^&]+)/);
  if (newFileNameMatch) {
    return newFileNameMatch[1];
  }
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
}

/**
 * 上传文件
 * @param item 文件
 * @param index 索引
 * @param options 选项
 */
function onPost(item: ExtendedUploaderFileListItem, index: number, options: any) {
  const { headers, formData, action, withCredentials, name, urlField, modelValue, emit, onUpdateModelValue, currentFileList } = options;
  const requestData = {
    url: action,
    headers,
    withCredentials,
    file: item.file,
    data: formData,
    name,
  };
  ajax({
    ...requestData,
    onProgress: (e: any) => {
      item.percent = e.percent;
      item.status = 'uploading';
      item.message = '上传中...';
      emit('progress', {
        e,
        file: item.file,
        item,
      });
    },
    onSuccess: (res: any) => {
      if (res.Code === 200 && Array.isArray(res.Data)) {
        res = {
          [urlField]: res.Data.map((f) => _.get(f, urlField))[0],
        };
      }
      item.status = 'success';
      item.message = '';
      item.percent = 100;
      if (_.has(res, urlField)) {
        item.url = _.get(res, urlField);
      }
      item.name = item?.url ? handleFileName(item?.url) || '' : item?.file?.name || '';
      item.response = res;
      onUpdateModelValue([...unref(currentFileList)]);
      emit('success', {
        res,
        file: item.file,
        item,
      });
    },
    onError: (err: any) => {
      item.status = 'failed';
      item.message = '上传失败';
      emit('error', {
        e: err,
        file: item.file,
        item,
      });
    },
    onStart: (e: any) => {
      emit('start', {
        e,
        file: item.file,
        item,
      });
    },
  });
}

/**
 * 如果autoUpload为true，则自动上传到服务器
 * @param file 文件
 */
export function postAfterRead(options: any, file: ExtendedUploaderFileListItem | Array<ExtendedUploaderFileListItem>) {
  const {
    headers,
    formData,
    action,
    name,
    urlField,
    modelValue,
    onUpdateModelValue,
    currentFileList,
    emit,
    withCredentials,
  } = options;
  const fileList = Array.isArray(file) ? file : [file];
  fileList.forEach((item, index) => {
    onPost(item, index, {
      headers,
      formData,
      action,
      withCredentials,
      name,
      urlField,
      modelValue,
      emit,
      onUpdateModelValue,
      currentFileList,
    });
  });
}

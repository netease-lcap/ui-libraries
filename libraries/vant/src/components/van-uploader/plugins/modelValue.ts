import _ from 'lodash';
import { ref } from 'vue';
import { useMemo, useControllableValue, useCallback } from '@/plugins/hooks';
import { ExtendedUploaderFileListItem } from './types';

type Converter = 'json' | 'simple';

const getFileNameByURL = (url) => {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
};

/**
 * 根据value获取文件列表
 * @param value 值
 * @param converter 转换器
 * @param fileList 文件列表
 * @returns 文件列表
 */
const getFileListByValue = (value, converter: Converter = 'simple', fileList) => {
  if (Array.isArray(fileList)) {
    return fileList as ExtendedUploaderFileListItem[];
  }

  if (!value) {
    return [];
  }

  if (converter === 'simple') {
    const values = value.split(',');
    return values.map((v) => {
      return {
        url: v,
        name: getFileNameByURL(v),
        status: 'success',
      } as ExtendedUploaderFileListItem;
    });
  }

  try {
    const parsedValue = JSON.parse(value || '[]');
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (e) {
    return [];
  }
};

/**
 * 格式化响应
 * @param urlField 文件路径字段
 * @param res 响应
 * @param uploadFile 上传文件
 * @returns 文件列表
 */
const formatResponse = (urlField, res, uploadFile) => {
  let url;
  // 新接口适配
  if (res.Code === 200 && Array.isArray(res.Data)) {
    [url] = _.at<string>(res.Data[0], urlField);
  } else {
    [url] = _.at<string>(res, urlField);
  }

  if (!url) {
    return {
      status: 'fail',
      error: `文件${uploadFile.name}上传接口调用失败`,
    };
  }
  return {
    url,
    name: uploadFile.name,
    status: 'success',
  };
};

/**
 * 根据文件列表获取值
 * @param fileList 文件列表
 * @param converter 转换器
 * @param urlField 文件路径字段
 * @returns 值
 */
const getValueByList = (fileList: ExtendedUploaderFileListItem[], converter: Converter, urlField: string) => {
  const successFiles = fileList
    .filter((item) => item.status === 'success')
    .map((item) => {
      if (item.response) {
        return formatResponse(urlField, item.response, item);
      }
      return item;
    });

  return converter === 'simple' ? successFiles.map((x) => x.url || '').join(',') : JSON.stringify(successFiles);
};

/**
 * 处理modelValue
 * @param props 属性
 * @returns 属性
 */
export function handleModelValue(props) {
  const [value, setValue] = useControllableValue(props);
  const urlField = props.get('urlField') || 'filePath';
  const converter = props.get('converter') || 'simple';
  const defaultFileList = useMemo(() => getFileListByValue(value, converter, undefined), [value, converter]);
  const autoUpload = props.get('autoUpload');
  const onUpdateModelValue = useCallback((fileList: ExtendedUploaderFileListItem[]) => {
    const value = getValueByList(fileList, converter, urlField);
    setValue(value);
  }, [converter, urlField, setValue]);
  const currentFileList = ref(defaultFileList);
  return {
    modelValue: currentFileList,
    'onUpdate:modelValue': (fileList: ExtendedUploaderFileListItem[]) => {
      if (!autoUpload) {
        fileList.forEach((file) => {
          file.status = 'success';
        });
      }
      onUpdateModelValue(fileList);
      currentFileList.value = fileList;
    },
    onUpdateModelValue,
  };
}
handleModelValue.order = 1;

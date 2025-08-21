import _ from 'lodash';
import { useControllableValue, useCallback, useState, useEffect } from '@/plugins/hooks';
import { ExtendedUploaderFileListItem } from './types';
import { postAfterRead } from './upload';

type Converter = 'json' | 'simple';

const getFileNameByURL = (url) => {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
};

/**
 * 根据value获取文件列表
 * @param value 值
 * @param converter 转换器
 * @returns 文件列表
 */
const getFileListByValue = (value, converter: Converter = 'simple') => {
  if (!value) {
    return [];
  }

  if (converter === 'simple') {
    if (typeof value === 'string') {
      const values = value.split(',');
      return values.map((v) => {
        return {
          url: v,
          name: getFileNameByURL(v),
          status: 'success',
        } as ExtendedUploaderFileListItem;
      });
    }
    return [];
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
    .filter((item) => item.status === 'success' || item.status === undefined)
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
  const [currentFileList, setCurrentFileList] = useState([]);
  const [value, setValue] = useControllableValue(props, {
    onValueEffect: (value) => {
      const converter = props.get('converter') || 'simple';
      const defaultFileList = getFileListByValue(value, converter);
      setCurrentFileList(defaultFileList);
    },
  });
  const urlField = props.get('urlField') || 'filePath';
  const converter = props.get('converter') || 'simple';

  const onUpdateModelValue = useCallback(
    (fileList: ExtendedUploaderFileListItem[]) => {
      const value = getValueByList(fileList, converter, urlField);
      setValue(value);
    },
    [converter, urlField, setValue],
  );
  const onSetCurrentFileList = (fileList: ExtendedUploaderFileListItem[]) => {
    onUpdateModelValue(fileList);
    setCurrentFileList(fileList);
  };
  return {
    modelValue: currentFileList,
    'onUpdate:modelValue': (fileList: ExtendedUploaderFileListItem[]) => {
      onSetCurrentFileList(fileList);
    },
    onUpdateModelValue,
    currentFileList,
    onSetCurrentFileList,
  };
}
handleModelValue.order = 1;

export function handleUpload(props) {
  const headers = props.get('headers');
  const formData = props.get('data');
  const action = props.get('action');
  const name = props.get('name');
  const withCredentials = props.get('withCredentials');
  const emit = props.get('emit');
  const urlField = props.get('urlField');
  const modelValue = props.get('modelValue');
  const currentFileList = props.get('currentFileList');
  const autoUpload = props.get('autoUpload');
  const onSetCurrentFileList = props.get('onSetCurrentFileList');
  const submitFn = useCallback(() => {
    const files = currentFileList?.filter((item) => item.file && !item.url);
    postAfterRead(
      {
        action,
        headers,
        formData,
        name,
        urlField,
        modelValue,
        currentFileList,
        emit,
        withCredentials,
        onSetCurrentFileList,
      },
      files,
    );
  }, [action, headers, formData, name, urlField, modelValue, currentFileList, withCredentials, onSetCurrentFileList]);
  const refProp = props.get('ref');
  const selfRef = _.assign(refProp, { submit: submitFn });

  useEffect(() => {
    if (autoUpload) {
      submitFn();
    }
  }, [currentFileList, autoUpload]);
  return {
    ref: selfRef,
  };
}

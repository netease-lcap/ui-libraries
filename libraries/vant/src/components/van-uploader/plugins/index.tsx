import _ from 'lodash';
import { showToast } from 'vant';
import { postAfterRead } from './upload';
import { useCallback, useMemo } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export * from './modelValue';
export * from './maxSize';
export * from './requestData';
export * from './ide';

export function handleFormTagName(props) {
  return {
    tagName: 'van-uploader',
    formTagName: 'van-form-uploader',
  };
}

export function handleDeleteProps(props) {
  const deletePropsList = props
    .get($deletePropsList)
    .concat([
      'ttlValue',
      'headers',
      'data',
      'urlField',
      'ttl',
      'autoUpload',
      'currentFileList',
      'action',
      'viaOriginURL',
      'lcapIsCompress',
      'converter',
      'withCredentials',
      'oversizeErrorMsg',
    ]);
  return {
    [$deletePropsList]: deletePropsList,
  };
}

/**
 * 处理自定义属性
 * @param props 属性
 * @returns 属性
 */
export function handleCustomProps(props) {
  let autoUpload = props.get('autoUpload');
  autoUpload = _.isNil(autoUpload) ? true : autoUpload;
  const name = props.get('name') || 'file';
  const urlField = props.get('urlField') || 'filePath';
  const readonly = props.get('readonly');
  const disabled = props.get('disabled');
  const deletable = props.get('deletable');
  const oversizeErrorMsg = props.get('oversizeErrorMsg') || '文件大小超出限制';
  const deletableValue = useMemo(() => {
    if (readonly) {
      return false;
    }
    if (disabled) {
      return false;
    }
    return deletable;
  }, [readonly, disabled, deletable]);
  return {
    autoUpload,
    name,
    urlField,
    deletable: deletableValue,
    oversizeErrorMsg,
  };
}
handleCustomProps.order = 1;

/**
 * 处理事件
 * @param props 属性
 * @returns 属性
 */
export function handleEvent(props) {
  const beforeRead = props.get('onBeforeRead');
  const beforeDelete = props.get('onBeforeDelete');
  const afterRead = props.get('onAfterRead');
  const onOversize = props.get('onOversize');
  const headers = props.get('headers');
  const formData = props.get('data');
  const action = props.get('action');
  const name = props.get('name');
  const withCredentials = props.get('withCredentials');
  const emit = props.get('emit');
  const urlField = props.get('urlField');
  const modelValue = props.get('modelValue');
  const onUpdateModelValue = props.get('onUpdateModelValue');
  const currentFileList = props.get('currentFileList');
  const autoUpload = props.get('autoUpload');
  const oversizeErrorMsg = props.get('oversizeErrorMsg');

  const submitFn = useCallback(() => {
    const files = currentFileList.value?.filter((item) => item.file && !item.url);
    postAfterRead(
      {
        action,
        headers,
        formData,
        name,
        urlField,
        modelValue,
        onUpdateModelValue,
        currentFileList,
        emit,
        withCredentials,
      },
      files,
    );
  }, [
    action,
    headers,
    formData,
    name,
    urlField,
    modelValue,
    onUpdateModelValue,
    currentFileList,
    autoUpload,
    withCredentials,
  ]);
  const refProp = props.get('ref');
  const selfRef = _.assign(refProp, { submit: submitFn });
  return {
    beforeRead: useCallback(
      (file: File, detail: any) => {
        let result = true;
        if (_.isFunction(beforeRead)) {
          result = _.attempt(beforeRead, {
            file,
            item: detail,
          });
        }
        return !(result === false);
      },
      [beforeRead],
    ),
    beforeDelete: useCallback(
      (file: File, detail: any) => {
        let result = true;
        if (_.isFunction(beforeDelete)) {
          result = _.attempt(beforeDelete, {
            file,
            item: detail,
          });
        }
        return !(result === false);
      },
      [beforeDelete],
    ),
    afterRead: useCallback(
      (file: any, detail: any) => {
        if (autoUpload) {
          postAfterRead(
            {
              action,
              headers,
              formData,
              name,
              urlField,
              modelValue,
              onUpdateModelValue,
              currentFileList,
              emit,
              withCredentials,
            },
            file,
          );
        }
        if (_.isFunction(afterRead)) {
          _.attempt(afterRead, {
            file,
            item: detail,
          });
        }
      },
      [
        afterRead,
        action,
        headers,
        formData,
        name,
        urlField,
        modelValue,
        onUpdateModelValue,
        currentFileList,
        autoUpload,
        withCredentials,
      ],
    ),
    onOversize: useCallback(
      (file: any, detail) => {
        if (_.isFunction(onOversize)) {
          _.attempt(onOversize, {
            file,
            item: detail,
          });
        }
        showToast(oversizeErrorMsg);
      },
      [onOversize, oversizeErrorMsg],
    ),
    ref: selfRef,
  };
}

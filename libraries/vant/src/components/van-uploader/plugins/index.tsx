import _ from 'lodash';
import { ExtendedUploaderFileListItem } from './types';
import { postAfterRead } from './upload';
import { useCallback } from '@/plugins/hooks';

export * from './modelValue';
export * from './maxSize';
export * from './requestData';

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
  return {
    autoUpload,
    name,
    urlField,
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
  return {
    beforeRead: useCallback((file: File, detail: any) => {
      let result = true;
      if (_.isFunction(beforeRead)) {
        result = _.attempt(beforeRead, {
          file,
          item: detail,
        });
      }
      return !(result === false);
    }, [beforeRead]),
    beforeDelete: useCallback((file: File, detail: any) => {
      if (_.isFunction(beforeDelete)) {
        return _.attempt(beforeDelete, {
          file,
          item: detail,
        });
      }
      return true;
    }, [beforeDelete]),
    afterRead: useCallback((file: any, detail: any) => {
      postAfterRead(props, file);
      if (_.isFunction(afterRead)) {
        _.attempt(afterRead, {
          file,
          item: detail,
        });
      }
    }, [afterRead]),
    onOversize: useCallback((file: any, detail) => {
      // TODO: 出错信息toast提示
      if (_.isFunction(onOversize)) {
        _.attempt(onOversize, {
          file,
          item: detail,
        });
      }
    }, [onOversize]),
  };
}

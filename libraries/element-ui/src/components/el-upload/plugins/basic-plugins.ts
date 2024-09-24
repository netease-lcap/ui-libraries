/* 组件功能扩展插件 */
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import { shallowRef, watch } from '@vue/composition-api';
import { isObject } from 'lodash';

const getFileNameByURL = (url) => {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
};

const getFileListByValue = (value, converter: 'json' | 'simple', fileList) => {
  if (Array.isArray(fileList)) {
    return fileList;
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
      };
    });
  }

  try {
    const parsedValue = JSON.parse(value || '[]');
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (e) {
    return [];
  }
};

const getValueByList = (fileList, convert) => {
  if (!fileList) {
    return null;
  }

  const list = fileList.filter((f) => f.status === 'success');
  if (list.length === 0) {
    return null;
  }

  if (convert === 'simple') {
    return list.map((x) => (x.url || '')).join(',');
  }

  return JSON.stringify(list);
};

export const useEvents = {
  setup: (props) => {
    return {
      beforeUpload: (file) => {
        const onBeforeUpload = props.get('onBeforeUpload');
        if (typeof onBeforeUpload === 'function') {
          onBeforeUpload(file);
        }
      },
      onProgress: (event, file, fileList) => {
        const onProgress = props.get('onProgress');
        if (typeof onProgress === 'function') {
          onProgress({
            file,
          });
        }
      },
      onExceed: (files, fileList) => {
        const onCountExceed = props.get('onCountExceed');
        if (typeof onCountExceed === 'function') {
          onCountExceed({
            files,
            allFileList: fileList,
          });
        }
      },
      onSuccess: (response, file, fileList) => {
        const onSuccess = props.get('onSuccess');
        if (typeof onSuccess === 'function') {
          onSuccess({
            file,
            fileList,
          });
        }
      },
      onError: (err, file, fileList) => {
        const onError = props.get('onError');
        if (typeof onError === 'function') {
          onError({
            file,
            fileList,
          });
        }
      },
      onRemove: (file, fileList) => {
        const onRemove = props.get('onRemove');
        if (typeof onRemove === 'function') {
          onRemove({
            file,
            fileList,
          });
        }
      },
    };
  },
  order: 2,
};

export const useValue2FileList: NaslComponentPluginOptions = {
  props: ['value', 'convert'],
  setup: (props) => {
    const fileList = shallowRef<Array<{ name: string; uid?: string; url: string; status?: string }>>(getFileListByValue(
      props.get('value'),
      props.get('converter'),
      props.get('fileList'),
    ));

    watch(() => props.get('value'), (v, oldV) => {
      const convert = props.getEnd<string>('converter');
      if (v === oldV || v === getValueByList(fileList.value, convert)) {
        return;
      }

      const list = getFileListByValue(v, convert as any, props.get('fileList'));
      const arr = [...fileList.value].filter((it) => {
        if (it.status !== 'success') {
          return true;
        }

        const index = list.findIndex((valueItem) => (valueItem.uid && valueItem.uid === it.uid) || valueItem.url === it.url);

        if (index === -1) {
          return false;
        }

        list.splice(index, 1);
        return true;
      });

      fileList.value = arr.concat(list);
    });

    const changeFileList = (list) => {
      const convert = props.getEnd<string>('converter');
      const updateValue = props.get('update:value');

      if (typeof updateValue === 'function') {
        updateValue(getValueByList(list, convert));
      }

      fileList.value = list;
    };

    return {
      fileList,
      onChange: (file, list) => {
        changeFileList(list);
        const onChange = props.get('onChange');
        return typeof onChange === 'function' ? onChange(file, list) : null;
      },
      onRemove: (file, fl) => {
        changeFileList(fl);
        const onRemove = props.get('onRemove');
        return typeof onRemove === 'function' ? onRemove(file, fl) : null;
      },
    };
  },
  order: 3,
};

export const useUploadFile: NaslComponentPluginOptions = {
  props: ['url'],
  setup: (props, { setupContext: ctx }) => {
    const action = props.useComputed(['url', 'action'], (v, a) => {
      const url = v || a || '/upload';
      const vueIns = ctx.root as any;
      return vueIns.$formatMicroFrontUrl ? vueIns.$formatMicroFrontUrl(url) : url;
    });

    const getCookie = (cname) => {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return '';
    };

    const headers = props.useComputed(['headers', 'access', 'ttl', 'ttlValue'], (propHeaders = {}, access, ttl, ttlValue) => {
      const lcapUploadHeaders: any = {
        Authorization: getCookie('Authorization'),
      };
      const { appInfo } = window as any;

      if (access) {
        lcapUploadHeaders['lcap-access'] = access;
      }

      if (appInfo && appInfo.domainName) {
        lcapUploadHeaders.DomainName = appInfo.domainName;
      }

      if (ttlValue !== null && ttlValue !== undefined) {
        if (ttl !== null && ttl !== undefined) {
          lcapUploadHeaders['lcap-ttl'] = ttl ? ttlValue : -1;
        } else {
          lcapUploadHeaders['lcap-ttl'] = ttlValue;
        }
      }

      return { ...(isObject(propHeaders) ? propHeaders : {}), ...lcapUploadHeaders };
    });

    const data = props.useComputed(['data', 'lcapIsCompress', 'viaOriginURL'], (propData, lcapIsCompress, viaOriginURL) => {
      const formData = {
        lcapIsCompress,
        viaOriginURL,
      };

      return { ...(isObject(propData) ? propData : {}), ...formData };
    });

    return {
      action,
      headers,
      data,
      onSuccess: (res: any, file, fileList) => {
        const onSuccess = props.get('onSuccess');
        const urlField = props.getEnd<string>('urlField') || 'url';
        if (res[urlField]) {
          const url = res[urlField];
          file.url = url;
        }

        if (typeof onSuccess === 'function') {
          onSuccess(res, file, fileList);
        }
      },
    };
  },
  order: 3,
};

export const useUploadTrigger: NaslComponentPluginOptions = {
  props: ['dragTipText'],
  setup: (props, { h }) => {
    return {
      slotDefault: () => {
        const listType = props.getEnd('listType');
        const dragTipText = props.getEnd<string>('dragTipText') || '将文件拖到此处，或点击上传';
        const drag = props.getEnd('drag');
        const slotDefault = props.get<any>('slotDefault');
        if (drag) {
          return [
            h('i', { class: 'el-icon-upload' }),
            h('div', { class: 'el-upload__text' }, dragTipText),
          ];
        }

        if (listType === 'picture-card') {
          return [h('i', { class: 'el-icon-plus' })];
        }

        return slotDefault ? slotDefault() : null;
      },
    };
  },
};

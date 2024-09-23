/* eslint-disable prefer-destructuring */
import {
  ElUploadProps,
  FormatResponseContext,
  ResponseType,
  SizeLimitObj,
  SuccessContext,
  UploadChangeContext,
  UploadFile,
  UploadProps,
} from '@element-pro';
import { $deletePropList, NaslComponentPluginOptions, useSyncState } from '@lcap/vue2-utils';
import { MapGet } from '@lcap/vue2-utils/plugins/types.js';
import { computed, ref, SetupContext, shallowRef, watch } from '@vue/composition-api';
import { at, isFunction, isObject, isPlainObject } from 'lodash';

type Converter = 'json' | 'simple';

const SIZE_UNITS = ['KB', 'MB', 'GB', 'TB', 'B'];
const getSizeLimit = (val: string) => {
  if (!val) {
    return undefined;
  }

  const index = SIZE_UNITS.findIndex((unit) => val.toUpperCase().endsWith(unit));
  if (index === -1 && Number.isNaN(Number(val))) {
    return undefined;
  }

  if (index === -1) {
    return {
      size: Number(val),
      unit: 'MB',
    } as SizeLimitObj;
  }

  const size = Number(val.substring(0, val.length - SIZE_UNITS[index].length));
  if (Number.isNaN(size)) {
    return undefined;
  }

  return {
    size,
    unit: SIZE_UNITS[index],
  } as SizeLimitObj;
};

function useUploadRequestInfo(props: MapGet, ctx: SetupContext) {
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

    return { ...(isPlainObject(propHeaders) ? propHeaders : {}), ...lcapUploadHeaders };
  });

  const data = props.useComputed(['data', 'lcapIsCompress', 'viaOriginURL'], (propData, lcapIsCompress, viaOriginURL) => {
    const formData = {
      lcapIsCompress,
      viaOriginURL,
    };

    return { ...(isObject(propData) ? propData : {}), ...formData };
  });

  function formatResponse(res, context: FormatResponseContext) {
    const urlField = props.get<string>('urlField') || 'url';

    let url;
    // 新接口适配
    if (res.Code === 200 && Array.isArray(res.Data)) {
      url = at<string>(res.Data[0], urlField)[0];
    } else {
      url = at<string>(res, urlField)[0];
    }

    if (!url) {
      return {
        status: 'fail',
        error: `文件${context.file.name}上传接口调用失败`,
      } as ResponseType;
    }

    return {
      url,
      status: 'success',
    } as ResponseType;
  }

  return {
    headers,
    data,
    action,
    formatResponse,
  };
}

const getFileNameByURL = (url) => {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
};

const getValueByList = (fileList: UploadFile[], converter: Converter) => {
  if (!fileList) {
    return null;
  }

  const list = fileList.filter((f) => f.status === 'success');
  if (list.length === 0) {
    return null;
  }

  if (converter === 'simple') {
    return list.map((x) => (x.url || '')).join(',');
  }

  return JSON.stringify(list);
};

const getFileListByValue = (value, converter: Converter = 'json', fileList) => {
  if (Array.isArray(fileList)) {
    return fileList as UploadFile[];
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
      } as UploadFile;
    });
  }

  try {
    const parsedValue = JSON.parse(value || '[]');
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (e) {
    return [];
  }
};

function useValue2FileList(props: MapGet) {
  const fileList = shallowRef<UploadFile[]>(getFileListByValue(
    props.get('value'),
    props.get('converter'),
    props.get('fileList'),
  ));

  watch(() => props.get('value'), (v, oldV) => {
    const converter = props.getEnd<Converter>('converter');
    if (v === oldV || v === getValueByList(fileList.value, converter)) {
      return;
    }

    const list = getFileListByValue(v, converter, props.get('fileList'));
    const arr = [...fileList.value].filter((it) => {
      if (it.status !== 'success') {
        return true;
      }

      const index = list.findIndex((valueItem) => valueItem.url === it.url);

      if (index === -1) {
        return false;
      }

      list.splice(index, 1);
      return true;
    });

    fileList.value = arr.concat(list);
  });

  const changeFileList = (list) => {
    const converter = props.get<Converter>('converter');
    const updateValue = props.get('update:value');

    if (typeof updateValue === 'function') {
      updateValue(getValueByList(list, converter));
    }

    fileList.value = list;
  };

  return {
    fileList,
    changeFileList,
  };
}

function checkAccept(file: UploadFile, accept: string) {
  if (!accept) {
    return true;
  }

  const extension = (file.name.indexOf('.') > -1 ? `.${file.name.split('.').pop()}` : '').toLowerCase();
  const type = file.type.toLowerCase();
  const baseType = type.replace(/\/.*$/, '').toLowerCase();
  const enable = accept.split(',')
    .map((t) => t.trim())
    .filter((t) => !!t)
    .some((acceptedType) => {
      acceptedType = acceptedType.toLowerCase();
      if (/^\..+$/.test(acceptedType)) {
        return extension.toLowerCase() === acceptedType;
      }
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '');
      }
      if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
        return type === acceptedType;
      }
      return false;
    });

  return enable;
}

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['converter', 'urlField'],
  setup: (props, { setupContext: ctx }) => {
    const { useComputed } = props;
    const sizeLimit = useComputed<SizeLimitObj | undefined>('sizeLimitStr', getSizeLimit);
    const uploadRequestInfo = useUploadRequestInfo(props, ctx);
    const { fileList, changeFileList } = useValue2FileList(props);
    const errorMessage = ref('');

    const locale = props.useComputed(['theme', 'cancelUploadText', 'triggerUploadText', 'draggable'], (theme, cancelUploadText: string, triggerUploadText: string, draggable: boolean) => {
      const uploadText = triggerUploadText || '选择文件';

      return {
        cancelUploadText: cancelUploadText || '取消上传',
        dragger: {
          clickAndDragText: draggable === true ? `点击上方“${uploadText}”或将文件拖到此区域` : `点击上方“${uploadText}”`,
          dragDropText: '释放鼠标',
          draggingText: '拖拽到此区域',
        },
        triggerUploadText: {
          fileInput: uploadText,
          image: theme && theme.includes('image') ? triggerUploadText || '点击上传图片' : uploadText,
          normal: '点击上传',
          // 选择文件和上传文件是 2 个步骤，文本需明确步骤
          reupload: '重新上传',
          continueUpload: '继续上传',
          delete: '删除',
          uploading: '上传中',
        },
      };
    });

    const beforeUpload: ElUploadProps['beforeUpload'] = (file: UploadFile) => {
      const accept = props.get<string>('accept');
      const beforeUploadFn = props.get('beforeUpload');
      const enable = checkAccept(file, accept);
      if (!enable) {
        errorMessage.value = `文件类型不匹配，请上传${accept}的文件类型`;
      }

      if (enable && isFunction(beforeUploadFn)) {
        return !!beforeUploadFn(file);
      }
      return enable;
    };

    useSyncState({
      fileList: () => fileList.value,
    });

    return {
      sizeLimit,
      ...uploadRequestInfo,
      files: fileList,
      locale,
      beforeUpload,
      tips: errorMessage,
      status: computed(() => (errorMessage.value ? 'error' : 'default')),
      uploadButton: (h, context: { disabled: boolean; uploading: boolean; uploadFiles: () => void; uploadText: string }) => {
        return h('el-button', {
          attrs: {
            loading: context.uploading,
            disabled: context.disabled || context.uploading,
            type: 'primary',
          },
          on: {
            click: () => context.uploadFiles?.(),
          },
        }, context.uploadText);
      },
      cancelUploadButton: (h, context: { disabled: boolean; cancelUploadText: string; cancelUpload: (event: any) => void }) => {
        return h('el-button', {
          attrs: {
            disabled: context.disabled,
          },
          on: {
            click: (e) => context.cancelUpload?.({ e }),
          },
        }, context.cancelUploadText);
      },
      onChange: (list, context: UploadChangeContext) => {
        errorMessage.value = '';
        const onChange = props.get<UploadProps['onChange']>('onChange') || (() => {});
        changeFileList(list);
        onChange(list, context);
      },
      onSuccess: (context: SuccessContext) => {
        const [autoUpload, onSuccess] = props.get<[boolean, any]>(['autoUpload', 'onSuccess']);
        // 未自动上传时，上传成功不会触发change
        if (autoUpload === false) {
          changeFileList(context.fileList);
        }

        if (isFunction(onSuccess)) {
          onSuccess(context);
        }
      },
      onSelectChange: (files: any[]) => {
        const onSelectChange = props.get('onSelectChange');
        const [multiple, max] = props.get<[boolean, number]>(['multiple', 'max']);
        if (multiple && max && fileList.value.length + files.length > max) {
          errorMessage.value = `文件数量超出限制，最多上传${max}个`;
        } else {
          errorMessage.value = '';
        }

        if (isFunction(onSelectChange)) {
          onSelectChange(files);
        }
      },
      [$deletePropList]: ['value'],
    };
  },
};

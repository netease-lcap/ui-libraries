/* eslint-disable prefer-destructuring */
import {
  FormatResponseContext,
  ResponseType,
  SizeLimitObj,
} from '@element-pro';
import { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { at, isObject, isPlainObject } from 'lodash';

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

function useUploadRequestInfo(props, ctx) {
  const action = props.useComputed('action', (a) => {
    const url = a || '/upload';
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
        headers['lcap-ttl'] = ttl ? ttlValue : -1;
      } else {
        headers['lcap-ttl'] = ttlValue;
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
    const urlField = props.get('urlField');

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

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup: (props, ctx) => {
    const { useComputed } = props;
    const sizeLimit = useComputed<SizeLimitObj | undefined>('sizeLimitStr', getSizeLimit);
    const uploadRequestInfo = useUploadRequestInfo(props, ctx);

    return {
      sizeLimit,
      ...uploadRequestInfo,
    };
  },
};

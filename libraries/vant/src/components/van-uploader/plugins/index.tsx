import { UploaderFileListItem } from 'vant';
import _ from 'lodash';
import isNil from 'lodash/isNil';
import { useRef, useMemo, useControllableValue } from '@/plugins/hooks';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import ajax from './ajax';

type Converter = 'json' | 'simple';

// TODO
const getFileNameByURL = (url) => {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
};

const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
};

const getLcapTtl = (params) => {
  const { ttl, ttlValue } = params;
  if (isNil(ttl) && isNil(ttlValue)) {
    return {};
  }
  if (isNil(ttl) && !isNil(ttlValue)) {
    return { 'lcap-ttl': ttlValue };
  }
  if (ttl) {
    return { 'lcap-ttl': isNil(ttlValue) ? -1 : ttlValue };
  }
  return {};
};

export function handleCustomProps(props) {
  let autoUpload = props.get('autoUpload');
  autoUpload = _.isNil(autoUpload) ? true : autoUpload;
  const name = props.get('name') || 'file';
  return {
    autoUpload,
    name,
  };
}
handleCustomProps.order = 1;

export function handleRequestHeaders(props) {
  const propHeaders = props.get('headers');
  const access = props.get('access');
  const ttl = props.get('ttl');
  const ttlValue = props.get('ttlValue');

  const { appInfo } = window as any;
  const lcapAccessObject = access ? { 'lcap-access': access } : {};
  const DomainName = appInfo?.domainName ? { DomainName: appInfo.domainName } : {};
  const lcapTtl = getLcapTtl({ ttl, ttlValue });
  const Authorization = { Authorization: getCookie('Authorization') };

  return {
    headers: _.assign(propHeaders, lcapAccessObject, DomainName, lcapTtl, Authorization),
  };
}

handleRequestHeaders.order = 2;

export function handleRequestData(props) {
  const propData = props.get('data');
  const lcapIsCompress = props.get('lcapIsCompress');
  const viaOriginURL = props.get('viaOriginURL');
  const action = props.get('action') || '/upload';

  const formData = {
    lcapIsCompress,
    viaOriginURL,
  };

  return {
    data: { ...(_.isObject(propData) ? propData : {}), ...formData },
    action,
  };
}

handleRequestData.order = 3;

function onPost(item: UploaderFileListItem, index: number, options: any) {
  const { headers, formData, action, withCredentials, name } = options;
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
      console.log(e);
    },
    onSuccess: (res: any) => {
      console.log(res);
    },
    onError: (err: any) => {
      console.log(err);
    },
    onStart: (e: any) => {
      console.log(e);
    },
  });
}

/**
 * 如果autoUpload为true，则自动上传到服务器
 * @param file 文件
 */
function postAfterRead(props: any, file: UploaderFileListItem | Array<UploaderFileListItem>) {
  const autoUpload = props.get('autoUpload');
  if (!autoUpload) {
    return;
  }
  const fileList = Array.isArray(file) ? file : [file];
  const headers = props.get('headers');
  const formData = props.get('data');
  const action = props.get('action');
  const name = props.get('name');
  const withCredentials = props.get('withCredentials');
  fileList.forEach((item, index) => {
    console.log(item);
    // TODO
    onPost(item, index, {
      headers,
      formData,
      action,
      withCredentials,
      name,
    });
  });
}

export function handleEvent(props) {
  const beforeRead = props.get('onBeforeRead');
  const beforeDelete = props.get('onBeforeDelete');
  const afterRead = props.get('onAfterRead');
  return {
    beforeRead: (rawFile: File) => {
      if (_.isFunction(beforeRead)) {
        return _.attempt(beforeRead, rawFile);
      }
      return true;
    },
    beforeDelete: (uploadFile: UploaderFileListItem, uploadFiles: UploaderFileListItem[]) => {
      if (_.isFunction(beforeDelete)) {
        _.attempt(beforeDelete, {
          uploadFile,
          uploadFiles,
        });
      }
    },
    afterRead: (file: any) => {
      postAfterRead(props, file);
      if (_.isFunction(afterRead)) {
        _.attempt(afterRead, file);
      }
    },
  };
}

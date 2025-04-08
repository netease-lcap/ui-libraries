import { UploadFile, UploadRawFile } from 'element-plus';
import _ from 'lodash';
import isNil from 'lodash/isNil';
import { ElDialog, ElFlex, ElIcon, ElText, ElButton } from '@/components/index';
import { useRef } from '@/plugins/hooks';

type Converter = 'json' | 'simple';

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

const getFileListByValue = (value, converter: Converter = 'simple', fileList) => {
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

const getValueByList = (fileList: UploadFile[], converter: Converter, urlField: string) => {
  const successFiles = fileList
    .filter((item) => item.status === 'success')
    .map((item) => {
      if (item.response) {
        return formatResponse(urlField, item.response, item);
      } else {
        return item;
      }
    });

  return converter === 'simple' ? successFiles.map((x) => x.url || '').join(',') : JSON.stringify(successFiles);
};

export function removeValueByList(list: UploadFile[]) {
  return Array.isArray(list) ? list.map((item) => item.url).join(',') : '';
}

export function handleResponse(props) {
  const onRemove = props.get('onRemove');
  const onChange = props.get('onChange');
  const urlField = props.get('urlField') || 'filePath';
  const converter = props.get('converter') || 'simple';
  const value = props.get('value');
  const setValue = props.get('onUpdate:value') ?? (() => {});
  const defaultFileList = getFileListByValue(value, converter, undefined);
  return {
    fileList: defaultFileList,
    onChange: (uploadFile: UploadFile, fileList: UploadFile[]) => {
      if (uploadFile.status === 'success') {
        const newValue = getValueByList(fileList, converter, urlField);
        _.attempt(setValue, newValue);
      }
      _.attempt(onChange, uploadFile, fileList);
    },
    onRemove: (uploadFile, fileList) => {
      const newValue = removeValueByList(fileList);
      _.attempt(setValue, newValue);
      _.attempt(onRemove, uploadFile, fileList);
    },
  };
}

const getLcapTtl = _.cond([
  [_.conforms({ ttl: isNil, ttlValue: isNil }), () => ({})],
  [_.conforms({ ttl: isNil, ttlValue: !isNil }), ({ ttlValue }) => ({ 'lcap-ttl': ttlValue })],
  [_.stubTrue, ({ ttl, ttlValue }) => ({ 'lcap-ttl': ttl ? ttlValue : -1 })],
]);
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

export function handleEvent(props) {
  const beforeUpload = props.get('onBeforeUpload');
  const beforeRemove = props.get('onBeforeRemove');

  return {
    beforeUpload: (rawFile: UploadRawFile) => {
      _.isFunction(beforeUpload) && _.attempt(beforeUpload, rawFile);
    },
    beforeRemove: (uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
      _.isFunction(beforeRemove) &&
        _.attempt(beforeRemove, {
          uploadFile,
          uploadFiles,
        });
    },
  };
}

export function handleSlots(props) {
  const triggerUploadText = props.get('triggerUploadText') || '上传到服务器';
  const slots = props.get('slots');
  const listType = props.get('listType');
  const ref = props.get('ref');
  const drag = props.get('drag');
  const autoUpload = props.get('autoUpload');
  const showUploadButton = props.get('showUploadButton');

  const dragSlot = {
    trigger: (
      <ElFlex direction="column" alignment="center">
        <ElIcon class="el-icon--upload" name="UploadFilled" />
        <ElFlex class="el-upload__text" justify="center">
          <ElText text="拖拽到此区域 或者 " />
          <ElText text="点击上传文件" color="primary" />
        </ElFlex>
      </ElFlex>
    ),
  };

  const pictureCardSlot = {
    trigger: (
      <ElFlex direction="column" alignment="center">
        <ElIcon class="el-icon--upload" name="Plus" />
      </ElFlex>
    ),
  };

  const uploadSlot = {
    default: (
      <ElButton
        text={triggerUploadText}
        onClick={() => {
          ref!.submit();
        }}></ElButton>
    ),
  };

  return {
    triggerUploadText,
    slots: Object.assign(slots, 
      drag ? dragSlot : {}, 
      listType === 'picture-card' ? pictureCardSlot : {}, 
      !autoUpload && showUploadButton ? uploadSlot : {}),
  };
}

export function handlePreviewRender(props) {
  const Component = props.get('render');
  const ref = props.get('ref');
  const nodepath = props.get('data-nodepath');
  const listType = props.get('listType');
  const updateRef = useRef({});
  const onPreview = props.get('onPreview');
  const imageRef = useRef({});
  const dialogRef = useRef({});
  const urlField = props.get('url-field') || 'filePath';
  if (listType !== 'picture-card') {
    return {};
  }
  return {
    render: (props, { attrs, slots }) => {
      return [
        <div data-nodepath={nodepath} style={props.style}>
          <Component
            ref={updateRef}
            {..._.omit({ ...props, ...attrs }, ['style'])}
            style={_.pickBy(props.style, (value, key) => key?.startsWith('--'))}
            v-slots={slots}
          />
          <ElDialog ref={dialogRef}>
            <img w-full src={imageRef.value.dialogImageUrl} alt="Preview Image" style={{ width: '100%', height: '100%' }} />
          </ElDialog>
        </div>,
      ];
    },
    onPreview: (uploadFile: UploadFile) => {
      const url = _.get(uploadFile, `response.${urlField}`, uploadFile.url);
      imageRef.value.dialogImageUrl = url;
      dialogRef.value.open();
      _.attempt(onPreview, uploadFile)
    },
    ref: {
      ...ref,
      submit: () => {
        updateRef.value.submit();
      },
      clearFiles: () => {
        updateRef.value.clearFiles();
      },
      abort: () => {
        updateRef.value.abort();
      },
      handleRemove: () => {
        updateRef.value.handleRemove();
      },
      handleStart: () => {
        updateRef.value.handleStart();
      },
    },
  };
}

handlePreviewRender.order = 1;

export * from './ide';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
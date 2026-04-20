import { ElMessage, UploadFile, UploadRawFile, UploadContentProps } from 'element-plus';
import _ from 'lodash';
import isNil from 'lodash/isNil';
import { ElDialog, ElFlex, ElIcon, ElText, ElButton } from '@/components/index';
import { useRef, useControllableValue, useSyncState, useMemo } from '@/plugins/hooks';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { $deletePropsList } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import FileTemplate from './file';
import idePlugin from './ide';

import { handleComponentInForm } from '@/components/el-form/plugins/form-item';

type Converter = 'json' | 'simple';
const getFileNameByURL = (url) => {
  const pathOnly = url.split('?')[0];
  const match = pathOnly.match(/\/([^/]+)$/);
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
      }
      return item;
    });

  return converter === 'simple' ? successFiles.map((x) => x.url || '').join(',') : JSON.stringify(successFiles);
};
const getLcapTtl = _.cond([
  [_.conforms({ ttl: isNil, ttlValue: isNil }), () => ({})],
  [_.conforms({ ttl: isNil, ttlValue: _.isNumber }), ({ ttlValue }) => ({ 'lcap-ttl': ttlValue })],
  [_.stubTrue, ({ ttl, ttlValue }) => ({ 'lcap-ttl': ttl ? ttlValue : -1 })],
]);
export function removeValueByList(list: UploadFile[]) {
  return Array.isArray(list) ? list.map((item) => item.url).join(',') : '';
}
const UploadBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElUploadOptions,
  UploadContentProps & {
    'onUpdate:modelValue':(value: string) => void;
    'onUpdate:fileList': (value: UploadFile[]) => void;
    'onUpdate:onRemove': (value: (uploadFile: UploadFile, fileList: UploadFile[]) => void) => void;
    'onUpdate:onChange': (value: (uploadFile: UploadFile, fileList: UploadFile[]) => void) => void;
    'url-field': string;
  }
>();

export default UploadBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleTagName',
    handle(props, context) {
      return {
        formTagName: 'el-form-upload',
        tagName: 'el-upload',
      };
    },
  })
  .addPlugin({
    name: 'handleComponentInForm',
    handle: handleComponentInForm,
  })
  .addPlugin({
    name: 'handlePreviewRender',
    handle(props) {
      const Component = props.get('render');
      const ref = props.get('ref');
      const nodepath = props.get('data-nodepath');
      const listType = props.get('listType');
      const updateRef = useRef<any>({});
      const onPreview = props.get('onPreview');
      const imageRef = useRef<{ dialogImageUrl?: string }>({});
      const dialogRef = useRef<{ open?:() => void }>({});
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
                <img w-full src={imageRef.value.dialogImageUrl} alt="" style={{ width: '100%', height: '100%' }} />
              </ElDialog>
            </div>,
          ];
        },
        onPreview: (uploadFile: UploadFile) => {
          const url = _.get(uploadFile, `response.${urlField}`, uploadFile.url);
          imageRef.value.dialogImageUrl = url;
          dialogRef.value.open?.();
          _.attempt(onPreview, uploadFile);
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
    },
  })
  .addPlugin({
    name: 'handleTagName',
    handle(props) {
      return {
        formTagName: 'el-form-upload',
        tagName: 'el-upload',
      };
    },
  })
  .addPlugin({
    name: 'handleResponse',
    handle(props) {
      const onRemove = props.get('onRemove');
      const onChange = props.get('onChange');
      const urlField = props.get('urlField') || 'filePath';
      const converter = props.get('converter') || 'simple';
      const [value, setValue] = useControllableValue(props);
      const defaultFileList = useMemo(() => getFileListByValue(value, converter, undefined), [value, converter]);
      const className = useMemo(() => props.get('class', ''), [props]);
      return {
        class: `${className} cw-upload`,
        fileList: defaultFileList,
        onChange: (uploadFile: UploadFile, fileList: UploadFile[]) => {
          if (uploadFile.status === 'success') {
            const newValue = getValueByList(fileList, converter, urlField);
            _.attempt(setValue, newValue);
          }
          _.attempt(onChange, uploadFile, fileList);
        },
        value,
        setValue,
        onRemove: (uploadFile, fileList) => {
          const newValue = removeValueByList(fileList);
          _.attempt(setValue, newValue);
          _.attempt(onRemove, uploadFile, fileList);
        },
      };
    },
  })
  .addPlugin({
    name: 'handleRequestHeaders',
    handle(props) {
      const propHeaders = props.get('headers');
      const access = props.get('access');
      const ttl = props.get('ttl');
      const ttlValue = props.get('ttlValue');

      const { appInfo } = window as any;
      const lcapAccessObject = access ? { 'lcap-access': access } : {};
      const DomainName = appInfo?.domainName ? { DomainName: appInfo.domainName } : {};
      const lcapTtl = getLcapTtl({ ttl, ttlValue });
      const Authorization = { Authorization: getCookie('Authorization') };
      const fileConnectionGroupProp = props.get('fileConnectionGroup');
      const fileConnectionGroup = fileConnectionGroupProp ? {
        'file-connection-group': fileConnectionGroupProp,
      } : {};

      return {
        headers: _.assign(propHeaders, lcapAccessObject, DomainName, lcapTtl, Authorization, fileConnectionGroup),
      };
    },
  })
  .addPlugin({
    name: 'handleRequestData',
    handle(props) {
      const propData = props.get('data');
      const lcapIsCompress = props.get('lcapIsCompress');
      const viaOriginURL = props.get('viaOriginURL');
      const action = props.get('action') || '/upload';

      const formData = {
        lcapIsCompress,
        viaOriginURL,
      };

      return {
        data: { ...(_.isPlainObject(propData) ? (propData as Record<string, any>) : {}), ...formData },
        action,
      };
    },
  })
  .addPlugin({
    name: 'handleEvent',
    handle(props) {
      const beforeUpload = props.get('onBeforeUpload', () => { });
      const beforeRemove = props.get('onBeforeRemove', () => { });
      const fileSizeLimit = props.get('fileSizeLimit');
      const checkFile = props.get('checkFile', () => { });
      const exceed = props.get('onExceed');
      const limit = props.get('limit');
      return {
        beforeUpload: (rawFile: UploadRawFile) => {
          const checkFileResult = _.attempt(checkFile, rawFile as any);
          if (checkFileResult) {
            ElMessage.error(checkFileResult);
            return false;
          }
          if (fileSizeLimit && rawFile.size > fileSizeLimit * 1024 * 1024) {
            ElMessage.error(`文件大小超过 ${fileSizeLimit} MB，请删除部分文件后继续。`);
            return false;
          }
          return _.attempt(beforeUpload, rawFile);
        },
        onExceed: (files: UploadFile[], uploadFiles: UploadFile[]) => {
          _.attempt(exceed, files, uploadFiles);
          ElMessage.error(`当前限制选择 ${limit} 个文件，请删除部分文件后继续。`);
        },
        beforeRemove: (uploadFile: UploadFile, uploadFiles: UploadFile[]) => {
          _.attempt(beforeRemove, {
            uploadFile,
            uploadFiles,
          });
        },
      };
    },
  })
  .addPlugin({
    name: 'handleSlots',
    handle(props) {
      const triggerUploadText = props.get('triggerUploadText') || '上传到服务器';
      const slots = props.get('slots') || {};
      const listType = props.get('listType');
      const ref = props.get('ref');
      const drag = props.get('drag');
      const autoUpload = props.get('autoUpload');
      const hasTip = props.get('hasTip');
      const showUploadButton = props.get('showUploadButton');
      const dragSlot = drag
        ? {
          trigger: (
            <ElFlex direction="column" alignment="center">
              <ElIcon class="el-icon--upload" name="UploadFilled" />
              <ElFlex class="el-upload__text" justify="center">
                <ElText text="拖拽到此区域 或者 " />
                <ElText text="点击上传文件" color="primary" />
              </ElFlex>
            </ElFlex>
          ),
        }
        : {};

      const pictureCardSlot = listType === 'picture-card'
        ? {
          trigger: (
            <ElFlex direction="column" alignment="center">
              <ElIcon class="el-icon--upload" name="Plus" />
            </ElFlex>
          ),
        }
        : {};

      const uploadSlot = !autoUpload && showUploadButton
        ? {
          default: (
            <ElButton
              text={triggerUploadText}
              onClick={() => {
                ref?.submit();
              }}
            />
          ),
        }
        : {};

      const tipSlot = hasTip ? { tip: slots.tip } : { tip: null };

      return {
        triggerUploadText,
        slots: { ...slots, ...dragSlot, ...pictureCardSlot, ...uploadSlot, ...tipSlot },
      };
    },
  })
  .addPlugin({
    name: 'handleDownload',
    handle(props) {
      const listType = props.get('listType');
      const fileList = props.get('fileList');
      const onRemove = props.get('onRemove');
      const setValue = props.get('setValue');
      const urlField = props.get('urlField') || 'filePath';
      const converter = props.get('converter') || 'simple';
      const deleteIcon = props.get('deleteIcon') ?? 'close';
      const disabled = props.get('disabled');
      const slots = props.get('slots');
      const fileSlot = {
        file: ({ file, index }) => {
          return (
            <FileTemplate
              file={file}
              index={index}
              disabled={disabled}
              deleteIcon={deleteIcon}
              onRemove={() => {
                _.attempt(onRemove, file, fileList);
                setValue(
                  getValueByList(
                    fileList.filter((item, i) => i !== index),
                    converter,
                    urlField,
                  ),
                );
              }}
              onDownload={() => { }}
            />
          );
        },
      };
      if (listType !== 'text') {
        return {};
      }
      return {
        slots: { ...slots, ...fileSlot },
      };
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);

      const previewRender = (insProps, { attrs, slots }) => {
        const inIDE = !!props.get('data-nodepath');
        const myClass = props.get('class', '');
        return inIDE ? (
          <el-text text="-" />
        ) : (
          <Component {...{ insProps }} {...attrs} class={`${myClass} el-upload__preview`} />
        );
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);
      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      useSyncState(props, 'disabled');
      useSyncState(props, 'preview');
      return {};
    },
  });

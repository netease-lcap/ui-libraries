// Utils
import { sync } from '@lcap/vue2-utils';
import { createNamespace, addUnit, noop, isPromise, isDef, _template } from '../utils';
import { toArray, readFile, isOversize, isImageFile } from './utils';

// Mixins
import { FieldMixin } from '../mixins/field';
import PreviewMixin from '../mixins/preview';

// Components
import Icon from '../icon';
import PopoverCombination from '../popover-combination';
import PopoverCombinationItem from '../popover-combination-item';
import Image from '../image';
import Loading from '../loading';
import ImagePreview from '../image-preview';
import Toast from '../toast/index';

import ajax from './ajax';

const [createComponent, bem, t] = createNamespace('uploader');

export default createComponent({
  inheritAttrs: false,

  mixins: [
    FieldMixin,
    PreviewMixin,
    sync({
      value: 'fileList',
      readonly: 'readonly',
      disabled: 'disabled',
      preview: 'isPreview',
    }),
  ],
  // model: {
  //   prop: 'fileListprop',
  // },

  props: {
    url: { type: String, default: '/gateway/lowcode/api/v1/app/upload' },
    headers: Object,
    autoUpload: { type: Boolean, default: true },
    withCredentials: { type: Boolean, default: false },
    data: Object,
    urlField: { type: String, default: 'filePath' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: 'file',
    },
    accept: {
      type: String,
    },
    // 废弃
    fileListProp: {
      type: [Array, String],
      default: () => [],
    },
    value: {
      type: [Array, String],
    },
    maxSize: {
      type: [Number, String, Function],
      default: 50 || Number.MAX_VALUE,
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    showUpload: {
      type: Boolean,
      default: true,
    },
    previewImage: {
      type: Boolean,
      default: true,
    },
    previewFullImage: {
      type: Boolean,
      default: true,
    },
    imageFit: {
      type: String,
      default: 'cover',
    },
    resultType: {
      type: String,
      default: 'file',
    },
    uploadIcon: {
      type: String,
      default: 'photograph',
    },
    converter: {
      type: String,
      default: 'json',
    },
    access: {
      type: String,
      default: null,
    },
    ttl: {
      type: Boolean,
      default: null,
    },
    ttlValue: {
      type: Number,
      default: null,
    },
    lcapIsCompress: {
      type: Boolean,
      default: false,
    },
    viaOriginURL: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.fromValue(this.value ?? this.fileListProp),
    };
  },
  computed: {
    previewSizeWithUnit() {
      return addUnit(this.previewSize);
    },

    // for form
    fileList() {
      return this.toValue(this.currentValue);
    },
    canUp() {
      if (this.currentValue.length === 0) return true;
      const can = this.currentValue.every(
        (item) => item.status !== 'uploading',
      );
      return can;
    },
  },
  watch: {
    value(val) {
      this.currentValue = this.fromValue(val);
    },
    fileListProp(val) {
      this.currentValue = this.fromValue(val);
    },
  },
  methods: {
    fromValue(value) {
      if (this.converter === 'json')
        try {
          const parsedValue = JSON.parse(value || '[]');
          return Array.isArray(parsedValue) ? parsedValue : [];
        } catch (err) {
          return [];
        }
      else if (this.converter === 'simple')
        try {
          if (!value) return [];
          return value
            .split(',')
            .map((x) => ({ url: x, name: this.handleFileName(x) }));
        } catch (err) {
          return [];
        }
      else return value || [];
    },
    toValue(value) {
      if (this.converter === 'json')
        // fix for u-validator rules="required"
        return Array.isArray(value) && value.length === 0
          ? null
          : JSON.stringify(value);
      if (this.converter === 'simple')
        return Array.isArray(value) && value.length === 0
          ? null
          : this.simpleConvert(value);
      return value;
    },
    simpleConvert(value) {
      return value.map((x) => x.url).join(',');
    },
    getDetail(index = this.currentValue.length) {
      return {
        name: this.name,
        index,
      };
    },

    // 校验文件类型是否匹配
    /**
     *
     * @param {File} file
     * @param {String} accept
     * @return {Boolean}
     */
    validateFile(file, accept = '') {
      // 通配符* 直接不校验
      if ((accept || '').trim() === '*') {
        return true;
      }

      const extension = (file.name.indexOf('.') > -1
        ? `.${file.name.split('.').pop()}`
        : ''
      ).toLowerCase();
      const type = file.type.toLowerCase();
      const baseType = type.replace(/\/.*$/, '').toLowerCase();
      const valid = accept
        .split(',')
        .map((type) => type.trim())
        .filter((type) => type)
        .some((acceptedType) => {
          acceptedType = acceptedType.toLowerCase();
          if (/^\..+$/.test(acceptedType)) {
            return extension.toLowerCase() === acceptedType;
          }
          if (/\/\*$/.test(acceptedType)) {
            return baseType === acceptedType.replace(/\/\*$/, '');
          }
          if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
            return type === acceptedType;
          }
          return false;
        });

      return valid;
    },

    onChange(event) {
      let { files } = event.target;

      if (this.disabled || !files.length) {
        return;
      }
      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead) {
        const response = this.beforeRead(files, this.getDetail());

        if (!response) {
          this.resetInput();
          return;
        }

        if (isPromise(response)) {
          response
            .then((data) => {
              if (data) {
                this.readFile(data);
              } else {
                this.readFile(files);
              }
            })
            .catch(this.resetInput);

          return;
        }
      }
      if (Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) {
          if (this.accept) {
            const valid = this.validateFile(files[i], this.accept);
            if (!valid) {
              this.resetInput();
              Toast(_template(t('typeError'), { accept: this.accept }));
              return null;
            }
          }
        }
      } else if (this.accept) {
        const valid = this.validateFile(files, this.accept);
        if (!valid) {
          Toast(_template(t('typeError'), { accept: this.accept }));
          this.resetInput();
          return null;
        }
      }
      this.readFile(files);
    },

    readFile(files) {
      const oversize = isOversize(files, this.maxSize);
      if (Array.isArray(files)) {
        const maxCount = this.maxCount - this.currentValue.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map((file) => readFile(file, this.resultType))).then(
          (contents) => {
            const list = files.map((file, index) => {
              const result = {
                file,
                status: '',
                message: '',
                uid:
                  file.uid !== undefined ? file.uid : Date.now() + files.length,
                name: file.name,
                size: file.size,
                percent: 0,
              };
              if (contents[index]) {
                result.content = contents[index];
              }

              return result;
            });

            this.onAfterRead(list, oversize);
          },
        );
      } else {
        readFile(files, this.resultType).then((content) => {
          const file = files; // 此时为单文件
          const result = {
            file: files,
            status: '',
            message: '',
            uid:
              file.uid !== undefined
                ? file.uid
                : Date.now() + (files?.length || 1),
            name: file.name,
            size: file.size,
          };

          if (content) {
            result.content = content;
          }

          this.onAfterRead(result, oversize);
        });
      }
    },

    onAfterRead(files, oversize) {
      this.resetInput();

      let validFiles = files;
      if (oversize) {
        let oversizeFiles = files;
        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach((item) => {
            if (item.file) {
              if (isOversize(item.file, this.maxSize)) {
                oversizeFiles.push(item);
                Toast(
                  _template(t('maxSize'), {
                    name: item.file.name,
                    size: this.maxSize,
                  }),
                );
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
          Toast(
            _template(t('maxSize'), {
              name: files.file.name,
              size: this.maxSize,
            }),
          );
        }
        this.$emit('oversize', oversizeFiles, this.getDetail());
      }

      const isValidFiles = Array.isArray(validFiles)
        ? Boolean(validFiles.length)
        : Boolean(validFiles);

      if (isValidFiles) {
        const tempArr = [...this.currentValue, ...toArray(validFiles)];

        this.currentValue = tempArr;

        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
        this.$nextTick(function() {
          this.currentValue.forEach((file, index) => {
            if (!file.url && !file.status) {
              file.status = 'uploading';
              file.message = t('uploading');
              this.post(file, index);
            }
          });
        });
      }
    },

    onDelete(file, index) {
      // 禁用、只读状态下不可删除
      if (this.disabled || this.readonly) {
        return;
      }

      const beforeDelete = file.beforeDelete ?? this.beforeDelete;
      if (beforeDelete) {
        const response = beforeDelete(file, this.getDetail(index));

        if (!response) {
          return;
        }

        if (isPromise(response)) {
          response
            .then(() => {
              this.deleteFile(file, index);
            })
            .catch(noop);
          return;
        }
      }

      this.deleteFile(file, index);
    },

    deleteFile(file, index) {
      const list = this.currentValue.slice(0);
      list.splice(index, 1);
      this.currentValue = list;
      this.$emit('input', this.toValue(this.currentValue));
      this.$emit('update:value', this.toValue(this.currentValue));
      this.$emit('update:fileListProp', this.toValue(this.currentValue));
      this.$emit('delete', { ...file, index }, this.getDetail(index));
    },

    resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },

    onClickUpload(event) {
      this.$emit('click-upload', event);
      event.stopPropagation();
    },

    onPreviewImage(item) {
      if (!this.previewFullImage) {
        return;
      }

      const imageFiles = this.currentValue.filter((item) => isImageFile(item));
      const imageContents = imageFiles.map(
        (item) => item.content || item.url || item,
      );

      this.imagePreview = ImagePreview({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: () => {
          this.$emit('close-preview');
        },
        ...this.previewOptions,
      });
    },

    // @exposed-api
    closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },

    // @exposed-api
    chooseFile() {
      if (this.disabled) {
        return;
      }
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.click();
      }
    },

    genPreviewMask(item) {
      const { status, message } = item;

      if (status === 'uploading' || status === 'failed') {
        const MaskIcon =
          status === 'failed' ? (
            <Icon name="close" class={bem('mask-icon')} />
          ) : (
            <Loading class={bem('loading')} type="spinner" />
          );

        const showMessage = isDef(message) && message !== '';

        return (
          <div class={bem('mask')}>
            {MaskIcon}
            {showMessage && <div class={bem('mask-message')}>{message}</div>}
          </div>
        );
      }
    },

    genPreviewItem(item, index) {
      const deleteAble = item.deletable ?? this.deletable;
      const showDelete =
        item.status !== 'uploading' && deleteAble && !this.readonly && !this.isPreview;

      const DeleteIcon = showDelete && (
        <div
          class={bem('preview-delete')}
          onClick={(event) => {
            event.stopPropagation();
            this.onDelete(item, index);
          }}
        >
          <Icon name="cross" class={bem('preview-delete-icon')} />
        </div>
      );

      const PreviewCoverContent = this.slots('preview-cover', {
        index,
        ...item,
      });

      const PreviewCover = PreviewCoverContent && (
        <div class={bem('preview-cover')}>{PreviewCoverContent}</div>
      );

      const previewSize = item.previewSize ?? this.previewSize;
      const imageFit = item.imageFit ?? this.imageFit;

      const getUrl = (item) => {
        let imgUrl = '';
        if (typeof item === 'object' && item !== null) {
          if (`${item?.url}` != 'undefined') {
            imgUrl = item.url;
          }
        } else {
          imgUrl = item || '';
        }
        return imgUrl;
      };
      const Preview =
        isImageFile(item) && getUrl(item.content || item.url || item) ? (
          <Image
            fit={imageFit}
            src={getUrl(item.content || item.url || item)}
            class={bem('preview-image')}
            width={previewSize}
            height={previewSize}
            lazyLoad={this.lazyLoad}
            onClick={() => {
              this.onPreviewImage(item);
            }}
          >
            {PreviewCover}
          </Image>
        ) : (
          <div
            class={bem('file')}
            style={{
              width: this.previewSizeWithUnit,
              height: this.previewSizeWithUnit,
            }}
          >
            <Icon class={bem('file-icon')} name="description" />
            <div class={[bem('file-name'), 'van-ellipsis']}>
              {item.file ? item.file.name : item.name ? item.name : item.url}
            </div>
            {PreviewCover}
          </div>
        );
      const getErrMsg = (errMsg) => {
        return JSON.parse(errMsg)?.Message || '';
      };
      return (
        <div>
          <div
            class={bem('preview')}
            onClick={() => {
              this.$emit('click-preview', item, this.getDetail(index));
            }}
          >
            {Preview}
            {this.genPreviewMask(item)}
            {DeleteIcon}
          </div>
          {item.errorMsg && getErrMsg(item.errorMsg) && (
            <div class={bem('err-info')}>
              <Icon class={bem('err-info-icon')} name="info" />
              <PopoverCombination
                placement="bottom-start"
                class={[bem('err-info-msg'), 'van-ellipsis', bem('title')]}
              >
                <template slot="reference">
                  {getErrMsg(item.errorMsg) || ''}
                </template>
                <PopoverCombinationItem slot="default">
                  <van-text text={getErrMsg(item.errorMsg)}></van-text>
                </PopoverCombinationItem>
              </PopoverCombination>
            </div>
          )}
        </div>
      );
    },

    genPreviewList() {
      if (this.previewImage) {
        if (this.currentValue?.length) {
          return this.currentValue.map(this.genPreviewItem);
        }

        if (this.isPreview) {
          return '--';
        }
      }
    },

    genUpload() {
      if (!this.canUp) return;
      if (this.readonly && !this.inDesigner()) return;
      if (this.currentValue.length >= this.maxCount || !this.showUpload) {
        return;
      }
      if (this.isPreview) return;

      const slot = this.slots();

      const Input = this.readonly ? null : (
        <input
          {...{
            attrs: {
              ...this.$attrs,
              capture: ['camera'].includes(this.$attrs.capture)
                ? this.$attrs.capture
                : undefined,
            },
          }}
          ref="input"
          type="file"
          accept={this.accept}
          class={bem('input')}
          disabled={this.disabled}
          onChange={this.onChange}
        />
      );

      let style;
      if (this.previewSize) {
        const size = this.previewSizeWithUnit;
        style = {
          width: size,
          height: size,
        };
      }
      return (
        <div
          class={bem('upload', {
            readonly: this.readonly,
            empty: this.currentValue.length === 0,
          })}
          style={style}
          onClick={this.onClickUpload}
        >
          <div
            class={bem('upload-icon-slot', {
              designer: this.inDesigner(),
            })}
            vusion-slot-name="default"
          >
            {slot || <Icon name={this.uploadIcon} class={bem('upload-icon')} />}
          </div>
          {this.uploadText && (
            <span class={bem('upload-text')}>{this.uploadText}</span>
          )}

          {Input}
        </div>
      );
    },

    handleFileName(url) {
      const match = url.match(/\/([^/]+)$/);
      return match ? match[1] : null;
    },

    post(file) {
      const headers = {
        ...this.headers,
        Authorization: this.getCookie('authorization') || null,
      };
      if (this.access !== null) {
        headers['lcap-access'] = this.access;
      }
      if (this.ttlValue !== null) {
        if (this.ttl !== null) {
          headers['lcap-ttl'] = this.ttl ? this.ttlValue : -1;
        } else {
          headers['lcap-ttl'] = this.ttlValue;
        }
      }

      if (window.appInfo && window.appInfo.domainName)
        headers.DomainName = window.appInfo.domainName;
      const formData = {
        ...this.data,
        lcapIsCompress: this.lcapIsCompress,
        viaOriginURL: this.viaOriginURL,
      };
      const requestData = {
        url: this.url,
        headers,
        withCredentials: this.withCredentials,
        file,
        data: formData,
        name: 'file',
      };
      const xhr = ajax({
        ...requestData,
        onStart: (e) => {
          this.$emit('start', {
            e,
            file: file.file,
            item: file,
          });
        },
        onProgress: (e) => {
          // file.status = 'uploading';
          // file.message = e.percent + '%' || '上传中...';
          file.percent = e.percent;
          this.$emit(
            'progress',
            {
              e,
              file: file.file,
              item: file,
              xhr,
            },
            this,
          );
        },
        onSuccess: (res) => {
          if (res.Code === 200 && Array.isArray(res.Data)) {
            res = {
              [this.urlField]: res.Data.map((f) => f[this.urlField])[0],
            };
          }

          file.status = 'success';
          file.message = '';
          file.percent = 100;
          if (res[this.urlField]) {
            file.url = res[this.urlField];
          }
          file.name = file?.url
            ? this.handleFileName(file?.url)
            : file?.file?.name;
          file.response = res;
          setTimeout(() => {
            if (this.canUp) {
              const value = this.currentValue;
              this.$emit('input', this.toValue(value));
              this.$emit('update:value', this.toValue(value));
              this.$emit('update:fileListProp', this.toValue(value));

              this.$emit(
                'success',
                {
                  res,
                  file: file.file,
                  item: file,
                  xhr,
                },
                this,
              );
            }
          }, 100);
        },
        onError: (e, res) => {
          file.status = 'failed';
          file.message = t('fail');
          file.errorMsg = e.errorMsg;
          this.$emit(
            'error',
            {
              e: e.err,
              res,
              file: file.file,
              item: file,
              xhr,
            },
            this,
          );
        },
      });
    },

    getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return '';
    },
  },

  render() {
    return (
      <div
        class={bem('', { uploaded: this.currentValue.length > 0 })}
        {...{ attrs: this.$attrs }}
      >
        <div
          class={bem('wrapper', {
            disabled: this.disabled,
            empty: this.currentValue.length === 0,
          })}
        >
          {this.genPreviewList()}
          {this.genUpload()}
        </div>
      </div>
    );
  },
});

import { defineComponent, computed } from '@vue/composition-api';
import {
  CloseIcon as ElCloseIcon,
  TimeFilledIcon as ElTimeFilledIcon,
  CheckCircleFilledIcon as ElCheckCircleFilledIcon,
  ErrorCircleFilledIcon as ElErrorCircleFilledIcon,
  CloseCircleFilledIcon as ElCloseCircleFilledIcon,
} from '@element-ui-icons';
import ElLoading from '../../loading';
// import Link from '../../link';
import { renderElNodeJSX } from '../../utils/render-tnode';
import { UploadFile } from '../type';
import { abridgeName } from '../../_common/js/upload/utils';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import { CommonDisplayFileProps } from '../interface';
import { commonProps } from '../constants';

export interface NormalFileProps extends CommonDisplayFileProps {
  multiple: boolean;
}

const NormalFile = defineComponent({
  name: 'UploadNormalFile',

  props: {
    multiple: Boolean,
    ...commonProps,
  },

  setup(props: NormalFileProps) {
    const icons = useGlobalIcon({
      CloseIcon: ElCloseIcon,
      TimeFilledIcon: ElTimeFilledIcon,
      CheckCircleFilledIcon: ElCheckCircleFilledIcon,
      ErrorCircleFilledIcon: ElErrorCircleFilledIcon,
      CloseCircleFilledIcon: ElCloseCircleFilledIcon,
    });

    const uploadPrefix = computed(() => `${props.classPrefix}-upload`);

    const classes = computed(() => [`${uploadPrefix.value}__single`, `${uploadPrefix.value}__single-${props.theme}`]);

    return {
      classes,
      uploadPrefix,
      icons,
    };
  },

  methods: {
    renderProgress(percent: number) {
      return (
        <div class={`${this.uploadPrefix}__single-progress`}>
          <ElLoading />
          <span class={`${this.uploadPrefix}__single-percent`}>{percent || 0}%</span>
        </div>
      );
    },

    // 文本型预览
    renderFilePreviewAsText(files: UploadFile[]) {
      if (this.theme !== 'file') return null;
      if (!this.multiple && files[0]?.status === 'fail' && this.autoUpload) {
        return null;
      }
      const { ErrorCircleFilledIcon, TimeFilledIcon, CloseIcon } = this.icons;
      return files.map((file, index) => {
        const fileName = this.abridgeName && file.name ? abridgeName(file.name, ...this.abridgeName) : file.name;
        return (
          <div
            class={`${this.uploadPrefix}__single-display-text ${this.uploadPrefix}__display-text--margin`}
            key={file.name + index + file.percent + file.status}
          >
            {file.url ? (
              <a
                href={file.url}
                target="_blank"
                hover="color"
                size="small"
                class={`${this.uploadPrefix}__single-name`}
              >
                {fileName}
              </a>
            ) : (
              <span class={`${this.uploadPrefix}__single-name`}>{fileName}</span>
            )}
            {file.status === 'fail' && (
              <div class={`${this.uploadPrefix}__flow-status ${this.uploadPrefix}__file-fail`}>
                <ErrorCircleFilledIcon />
              </div>
            )}
            {file.status === 'waiting' && (
              <div class={`${this.uploadPrefix}__flow-status ${this.uploadPrefix}__file-waiting`}>
                <TimeFilledIcon />
              </div>
            )}
            {file.status === 'progress' && this.renderProgress(file.percent)}
            {!this.disabled && file.status !== 'progress' && (
              <CloseIcon
                class={`${this.uploadPrefix}__icon-delete`}
                onClick={({ e }: { e: MouseEvent }) => this.onRemove({ e, file, index })}
              />
            )}
          </div>
        );
      });
    },

    // 输入框型预览
    renderFilePreviewAsInput() {
      if (this.theme !== 'file-input') return;
      const {
        TimeFilledIcon, CheckCircleFilledIcon, ErrorCircleFilledIcon, CloseCircleFilledIcon,
      } = this.icons;
      const file = this.displayFiles[0] || {};
      const inputTextClass = [
        `${this.classPrefix}-input__inner`,
        { [`${this.uploadPrefix}__placeholder`]: !this.displayFiles[0] },
      ];
      const disabledClass = this.disabled ? `${this.classPrefix}-is-disabled` : '';
      const fileName = this.abridgeName?.length && file?.name ? abridgeName(file.name, ...this.abridgeName) : file?.name;
      return (
        <div class={`${this.uploadPrefix}__single-input-preview ${this.classPrefix}-input ${disabledClass}`}>
          <div class={inputTextClass}>
            <span class={[`${this.uploadPrefix}__single-input-text`, { [this.placeholderClass]: this.placeholder }]}>
              {file.name ? fileName : this.placeholder}
            </span>
            {file.status === 'progress' && this.renderProgress(file.percent)}
            {file.status === 'waiting' && (
              <TimeFilledIcon class={`${this.uploadPrefix}__status-icon ${this.uploadPrefix}__file-waiting`} />
            )}
            {file.status === 'success' && <CheckCircleFilledIcon class={`${this.uploadPrefix}__status-icon`} />}
            {file.name && file.status === 'fail' && (
              <ErrorCircleFilledIcon class={`${this.uploadPrefix}__status-icon ${this.uploadPrefix}__file-fail`} />
            )}
            {Boolean(!this.disabled && file.name) && (
              <CloseCircleFilledIcon
                class={`${this.uploadPrefix}__single-input-clear`}
                onClick={({ e }: { e: MouseEvent }) => this.onRemove({ e, file, index: 0 })}
              />
            )}
          </div>
        </div>
      );
    },
  },

  render() {
    let fileListDisplay = renderElNodeJSX(this, 'fileListDisplay', {
      params: {
        onRemove: this.onRemove,
        toUploadFiles: this.toUploadFiles,
        sizeOverLimitMessage: this.sizeOverLimitMessage,
        locale: this.locale,
        files: this.displayFiles,
      },
    });
    if (this.fileListDisplay === null || fileListDisplay === null) {
      fileListDisplay = null;
    }
    return (
      <div class={this.classes}>
        {this.theme === 'file-input' && this.renderFilePreviewAsInput()}

        {this.$scopedSlots.default?.(null)}

        {this.theme === 'file' && this.placeholder && !this.displayFiles[0] && (
          <small class={[this.tipsClasses, this.placeholderClass]}>{this.placeholder}</small>
        )}

        {fileListDisplay === null ? null : fileListDisplay || this.renderFilePreviewAsText(this.displayFiles)}

        {/* 单文件上传失败要显示失败的原因 */}
        {!this.multiple && this.displayFiles[0]?.status === 'fail' && this.theme === 'file' ? (
          <small class={[this.errorClasses, this.placeholderClass]}>
            {this.displayFiles[0].response?.error || this.locale.progress.failText}
          </small>
        ) : null}
      </div>
    );
  },
});

export default NormalFile;

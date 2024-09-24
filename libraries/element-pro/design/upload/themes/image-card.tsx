import { CreateElement } from 'vue';
import {
  defineComponent, PropType, toRefs, computed,
} from '@vue/composition-api';
import {
  BrowseIcon as ElBrowseIcon,
  DeleteIcon as ElDeleteIcon,
  AddIcon as ElAddIcon,
  ErrorCircleFilledIcon as ElErrorCircleFilledIcon,
} from '@element-ui-icons';
import Link from '../../link';
import Loading from '../../loading';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import ImageViewer from '../../image-viewer';
import { CommonDisplayFileProps } from '../interface';
import { commonProps } from '../constants';
import { ElUploadProps, UploadFile } from '../type';
import { abridgeName } from '../../_common/js/upload/utils';
import { renderElNodeJSX } from '../../utils/render-tnode';
import Image from '../../image';

export interface ImageCardUploadProps extends CommonDisplayFileProps {
  multiple: ElUploadProps['multiple'];
  max: ElUploadProps['max'];
  disabled?: ElUploadProps['disabled'];
  showUploadProgress: ElUploadProps['showUploadProgress'];
  triggerUpload?: (e: MouseEvent) => void;
  uploadFiles?: (toFiles?: UploadFile[]) => void;
  cancelUpload?: (context: { e: MouseEvent; file: UploadFile }) => void;
}

export default defineComponent({
  name: 'UploadImageCard',

  props: {
    ...commonProps,
    multiple: Boolean,
    max: Number,
    disabled: Boolean,
    showUploadProgress: Boolean,
    triggerUpload: Function as PropType<ImageCardUploadProps['triggerUpload']>,
    uploadFiles: Function as PropType<ImageCardUploadProps['uploadFiles']>,
    cancelUpload: Function as PropType<ImageCardUploadProps['cancelUpload']>,
    showImageFileName: Boolean,
  },

  setup(props: ImageCardUploadProps) {
    const { displayFiles, multiple, max } = toRefs(props);
    const icons = useGlobalIcon({
      AddIcon: ElAddIcon,
      BrowseIcon: ElBrowseIcon,
      DeleteIcon: ElDeleteIcon,
      ErrorCircleFilledIcon: ElErrorCircleFilledIcon,
    });

    const showTrigger = computed(() => {
      if (multiple.value) {
        return !max.value || displayFiles.value.length < max.value;
      }
      return !displayFiles.value?.[0];
    });

    return {
      icons,
      showTrigger,
    };
  },

  methods: {
    renderMainContent(file: UploadFile, index: number) {
      const { BrowseIcon, DeleteIcon } = this.icons;
      return (
        <div class={`${this.classPrefix}-upload__card-content ${this.classPrefix}-upload__card-box`}>
          <Image class={`${this.classPrefix}-upload__card-image`} src={file.url || file.raw} error="" />
          <div class={`${this.classPrefix}-upload__card-mask`}>
            <span class={`${this.classPrefix}-upload__card-mask-item`} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <ImageViewer
                images={this.displayFiles.map((t: UploadFile) => t.url || t.raw)}
                defaultIndex={index}
                trigger={(h: CreateElement, { open }: any) => (
                  <BrowseIcon
                    onClick={({ e }: { e: MouseEvent }) => {
                      this.$emit('preview', { file, index, e });
                      open();
                    }}
                  />
                )}
                props={this.imageViewerProps}
              ></ImageViewer>
            </span>
            {!this.disabled && [
              <span class={`${this.classPrefix}-upload__card-mask-item-divider`} />,
              <span
                class={`${this.classPrefix}-upload__card-mask-item`}
                onClick={(e: MouseEvent) => e.stopPropagation()}
              >
                <DeleteIcon onClick={({ e }: { e: MouseEvent }) => this.onRemove?.({ e, file, index })} />
              </span>,
            ]}
          </div>
        </div>
      );
    },

    renderProgressFile(file: UploadFile, loadCard: string) {
      return (
        <div class={[loadCard, `${this.classPrefix}-upload__${this.theme}-${file.status}`]}>
          <Loading loading={true} size="medium" />
          <p>
            {this.locale?.progress?.uploadingText}
            {this.showUploadProgress ? ` ${file.percent}%` : ''}
          </p>
        </div>
      );
    },

    renderFailFile(file: UploadFile, index: number, loadCard: string) {
      const { ErrorCircleFilledIcon, DeleteIcon } = this.icons;
      return (
        <div class={loadCard}>
          <ErrorCircleFilledIcon />
          <p>{file.response?.error || this.locale?.progress?.failText}</p>
          <div class={`${this.classPrefix}-upload__card-mask`}>
            <span class={`${this.classPrefix}-upload__card-mask-item`} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <DeleteIcon onClick={({ e }: { e: MouseEvent }) => this.onRemove?.({ e, file, index })} />
            </span>
          </div>
        </div>
      );
    },
  },

  render() {
    // render custom UI with fileListDisplay
    const customList = renderElNodeJSX(this, 'fileListDisplay', {
      params: {
        files: this.displayFiles,
        onPreview: this.onPreview,
        toUploadFiles: this.toUploadFiles,
        sizeOverLimitMessage: this.sizeOverLimitMessage,
        locale: this.locale,
        triggerUpload: this.triggerUpload,
        uploadFiles: this.uploadFiles,
        cancelUpload: this.cancelUpload,
        onRemove: this.onRemove,
      },
    });
    if (customList) return customList;

    const cardItemClasses = `${this.classPrefix}-upload__card-item ${this.classPrefix}-is-background`;
    const { AddIcon } = this.icons;

    return (
      <div>
        <ul class={`${this.classPrefix}-upload__card`}>
          {this.displayFiles?.map((file: UploadFile, index: number) => {
            const loadCard = `${this.classPrefix}-upload__card-container ${this.classPrefix}-upload__card-box`;
            const fileName = this.abridgeName ? abridgeName(file.name, ...this.abridgeName) : file.name;
            const fileNameClassName = `${this.classPrefix}-upload__card-name`;
            return (
              <li class={cardItemClasses} key={index}>
                {file.status === 'progress' && this.renderProgressFile(file, loadCard)}
                {file.status === 'fail' && this.renderFailFile(file, index, loadCard)}
                {!['progress', 'fail'].includes(file.status) && this.renderMainContent(file, index)}
                {fileName
                  && this.showImageFileName
                  && (file.url ? (
                    <Link href={file.url} class={fileNameClassName} target="_blank" hover="color" size="small">
                      {fileName}
                    </Link>
                  ) : (
                    <span class={fileNameClassName}>{fileName}</span>
                  ))}
              </li>
            );
          })}

          {this.showTrigger && (
            <li class={cardItemClasses} onClick={this.triggerUpload}>
              <div
                class={[
                  `${this.classPrefix}-upload__image-add ${this.classPrefix}-upload__card-container ${this.classPrefix}-upload__card-box`,
                  {
                    [`${this.classPrefix}-is-disabled`]: this.disabled,
                  },
                ]}
              >
                <AddIcon />
                <p class={`${this.classPrefix}-size-s ${this.classPrefix}-upload__add-text`}>
                  {this.locale?.triggerUploadText?.image}
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  },
});

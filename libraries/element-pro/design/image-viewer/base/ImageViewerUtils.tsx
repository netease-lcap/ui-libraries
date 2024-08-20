import { computed, defineComponent, PropType } from '@vue/composition-api';
import {
  ImageIcon, ZoomInIcon, ZoomOutIcon, DownloadIcon, MirrorIcon, RotationIcon,
} from '@element-ui-icons';
import ElImageViewerIcon from './ImageModalIcon';
import ElToolTip from '../../tooltip';
import { useConfig } from '../../hooks/useConfig';
import { downloadFile } from '../utils';
import { useImagePreviewUrl } from '../../hooks';
import { ImageInfo } from '../type';

const currentImage = {
  type: Object as PropType<ImageInfo>,
  default() {
    return {};
  },
};

export default defineComponent({
  name: 'ElImageViewerUtils',
  props: {
    scale: Number,
    rotateHandler: Function as PropType<() => void>,
    zoomInHandler: Function as PropType<() => void>,
    zoomOutHandler: Function as PropType<() => void>,
    mirrorHandler: Function as PropType<() => void>,
    resetHandler: Function as PropType<() => void>,
    currentImage,
  },
  setup(props) {
    const { classPrefix, global: globalConfig } = useConfig('imageViewer');

    const imageUrl = computed(() => props.currentImage.mainImage);

    const { previewUrl } = useImagePreviewUrl(imageUrl);

    return {
      classPrefix,
      globalConfig,
      previewUrl,
    };
  },
  render() {
    return (
      <div class={`${this.classPrefix}-image-viewer__utils`}>
        <div class={`${this.classPrefix}-image-viewer__utils-content`}>
          <ElToolTip
            overlayClassName={`${this.classPrefix}-image-viewer__utils--tip`}
            content={this.globalConfig.mirrorTipText}
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
          >
            <ElImageViewerIcon clickHandler={this.mirrorHandler} icon={() => <MirrorIcon size="medium" />} />
          </ElToolTip>
          <ElToolTip
            overlayClassName={`${this.classPrefix}-image-viewer__utils--tip`}
            content={this.globalConfig.rotateTipText}
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
          >
            <ElImageViewerIcon clickHandler={this.rotateHandler} icon={() => <RotationIcon size="medium" />} />
          </ElToolTip>
          <ElImageViewerIcon icon={() => <ZoomOutIcon size="medium" />} clickHandler={this.zoomOutHandler} />
          <ElImageViewerIcon
            class={`${this.classPrefix}-image-viewer__utils-scale`}
            size="medium"
            label={`${this.scale * 100}%`}
          />
          <ElImageViewerIcon icon={() => <ZoomInIcon size="medium" />} clickHandler={this.zoomInHandler} />
          <ElToolTip
            overlayClassName={`${this.classPrefix}-image-viewer__utils--tip`}
            content={this.globalConfig.originalSizeTipText}
            destroyOnClose
            placement="top"
            showArrow
            theme="default"
          >
            <div class={`${this.classPrefix}-image-viewer__modal-icon`}>
              <ElImageViewerIcon icon={() => <ImageIcon size="medium" />} clickHandler={this.resetHandler} />
            </div>
          </ElToolTip>
          {this.currentImage.download && (
            <ElImageViewerIcon
              icon={() => <DownloadIcon size="medium" />}
              clickHandler={() => {
                downloadFile(this.previewUrl);
              }}
            />
          )}
        </div>
      </div>
    );
  },
});

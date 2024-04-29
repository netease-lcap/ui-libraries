import { createNamespace, isDef, addUnit, inBrowser } from '../utils';
import Icon from '../icon';
// eslint-disable-next-line import/no-cycle
import ImagePreview from '../image-preview';

const [createComponent, bem] = createNamespace('image');

export default createComponent({
  props: {
    src: String,
    fit: String,
    alt: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconPrefix: String,
    loadingType: {
      type: String,
      default: 'loading',
      validator: (value) => ['loading', 'placeholder', 'none'].includes(value),
    },
    placeholderSrc: String,
    showError: {
      type: Boolean,
      default: true,
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
    errorIcon: {
      type: String,
      default: 'photo-fail',
    },
    loadingIcon: {
      type: String,
      default: 'photo',
    },
    sr: {
      type: String,
      default: 's',
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: true,
      error: false,
      placeholderLoading: true,
      placeholderError: false,
    };
  },

  watch: {
    src() {
      this.loadImage();
    },
    placeholderSrc() {
      this.loadPlaceholderImage();
    },
    loadingType(type, oldType) {
      if (oldType !== type && type === 'placeholder') {
        this.loadPlaceholderImage();
      }
    },
  },

  computed: {
    style() {
      const style = {};

      if (isDef(this.width)) {
        style.width = addUnit(this.width);
      }

      if (isDef(this.height)) {
        style.height = addUnit(this.height);
      }

      if (isDef(this.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = addUnit(this.radius);
      }

      return style;
    },
    convertedSrc() {
      return this.getSrc(this.src);
    },
    convertedPlaceholderSrc() {
      if (this.loadingType !== 'placeholder') return;
      return this.getSrc(this.placeholderSrc);
    },
  },

  created() {
    const { $Lazyload } = this;

    if ($Lazyload && inBrowser) {
      $Lazyload.$on('loaded', this.onLazyLoaded);
      $Lazyload.$on('error', this.onLazyLoadError);
    }
  },

  mounted() {
    this.loadImage();
    this.loadPlaceholderImage();
  },

  beforeDestroy() {
    const { $Lazyload } = this;

    if ($Lazyload) {
      $Lazyload.$off('loaded', this.onLazyLoaded);
      $Lazyload.$off('error', this.onLazyLoadError);
    }
  },

  methods: {
    getSrc(src) {
      if (this.ifDesigner() && !src) {
        return 'https://static-vusion.nos-eastchina1.126.net/h5-template/lietu.png';
      }
      if (src?.indexOf?.('base64') !== -1) {
        return src;
      }

      // 同步 PC 端图片链接的处理逻辑
      // 正则表达式用于匹配以逗号分隔的字符串列表，其中每个字符串都不能包含[]
      const reg = /^([^[\]]+)(,([^[\]]+)){0,}$/g;
      if (typeof src === 'string' && reg.test(src)) {
        const [a1, a2] = src.split(',');
        if (/\/\//.test(a2)) {
          return a1;
        }
      }

      try {
        const tempSrc = JSON.parse(src);
        const tempItem = tempSrc[0];
        return tempItem.url;
      } catch (e) {
        return src;
      }
    },
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    onLoad(event) {
      this.loading = false;
      this.error = false;
      this.placeholderLoading = false;
      this.$emit('load', event);
    },

    onLazyLoaded({ el }) {
      if (el === this.$refs.image && this.loading) {
        this.onLoad();
      }
    },

    onLazyLoadError({ el }) {
      if (el === this.$refs.image && !this.error) {
        this.onError();
      }
    },

    onError(event) {
      this.error = true;
      this.loading = false;
      this.$emit('error', event);
    },

    onClick(event) {
      // if (this.$parent.$options._componentTag === 'van-cardu') return;
      if (window.top.globalData) return;

      if (this.$listeners.click) {
        this.$emit('click', event);
      }

      if (!this.ifDesigner() && this.preview) {
        ImagePreview([this.getSrc(this.src)]);
      }
    },

    genPlaceholder() {
      if (this.loading && this.showLoading) {
        const needLoadingInPlaceholderMode =
          this.loadingType === 'placeholder' &&
          !this.error &&
          (this.placeholderLoading || this.placeholderError);
        const needLoadingInLoadingMode = this.loadingType === 'loading';
        if (needLoadingInLoadingMode || needLoadingInPlaceholderMode) {
          return (
            <div class={bem('loading')}>
              {this.slots('loading') || (
                <Icon
                  name={this.loadingIcon}
                  class={bem('loading-icon')}
                  classPrefix={this.iconPrefix}
                />
              )}
            </div>
          );
        }
      }

      if (this.error && this.showError) {
        if (
          !this.ifDesigner() &&
          this.$parent.$options._componentTag === 'van-cardu'
        ) {
          return null;
        }
        return (
          <div class={bem('error')}>
            {this.slots('error') || (
              <Icon
                name={this.errorIcon}
                class={bem('error-icon')}
                classPrefix={this.iconPrefix}
              />
            )}
          </div>
        );
      }
    },

    genImage() {
      const imgData = {
        class: bem('img'),
        attrs: {
          alt: this.alt,
        },
        style: {
          objectFit: this.fit,
        },
      };

      if (this.error) {
        return;
      }

      if (this.ifDesigner()) {
        return <s-image src={this.convertedSrc} {...imgData} />;
      }

      if (this.lazyLoad) {
        return <img ref="image" vLazy={this.getSrc(this.src)} {...imgData} />;
      }
      if (this.loadingType !== 'placeholder') {
        return <img src={this.convertedSrc} {...imgData} />;
      }
      if (!this.placeholderLoading) {
        return (
          <img
            src={
              this.loading ? this.convertedPlaceholderSrc : this.convertedSrc
            }
            {...imgData}
          />
        );
      }
      return null;
    },

    loadImage() {
      if (this.lazyLoad) {
        // lazyLoad / designer 不走这段逻辑
        return;
      }

      if (this.ifDesigner()) {
        this.loading = false;
        return;
      }

      this.loading = true;
      this.error = false;

      const [promise] = this.load(this.convertedSrc);

      promise.then(
        (e) => {
          this.onLoad(e);
        },
        (e) => {
          this.onError(e);
        }
      );
    },
    loadPlaceholderImage() {
      if (this.lazyLoad) {
        // lazyLoad 不走这段逻辑
        return;
      }
      if (!this.loading || this.loadingType !== 'placeholder') {
        // 模式不匹配或正常的图片已经成功加载，不需要加载占位图片
        return;
      }
      this.placeholderLoading = true;
      this.placeholderError = false;
      const [promise] = this.load(this.convertedPlaceholderSrc);

      promise.then(
        () => {
          this.placeholderLoading = false;
          this.placeholderError = false;
        },
        () => {
          this.placeholderLoading = false;
          this.placeholderError = true;
        }
      );
    },
    load(src, onTimeout = () => {}, delay = 10000) {
      const img = new Image();
      const timer = setTimeout(onTimeout, delay);
      return [
        new Promise((res, rej) => {
          img.onload = (e) => {
            res(e);
            img.onload = undefined;
            img.onerror = undefined;
          };
          img.onerror = (e) => {
            rej(e);
            img.onload = undefined;
            img.onerror = undefined;
          };
          img.src = src;
        }),
        () => clearTimeout(timer),
      ];
    },
  },

  render() {
    if (!this.src && !this.ifDesigner()) return null;
    return (
      <div
        class={bem({ round: this.sr === 'r' || this.round })}
        style={this.style}
        onClick={this.onClick}
      >
        {this.genImage()}
        {this.genPlaceholder()}
        {this.slots()}
      </div>
    );
  },
});

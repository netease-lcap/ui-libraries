import { defineComponent, ref, watch } from 'vue';
import _ from 'lodash';
import { ElIcon } from '../index';

export default defineComponent({
  name: 'ElLoading',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
    },
    body: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
    lock: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
    background: {
      type: String,
    },
    spinner: {
      type: String,
    },
    svg: {
      type: String,
    },
    svgViewBox: {
      type: String,
    },
    customClass: {
      type: String,
    },
  },
  setup(props) {
    const isVisible = ref(false);
    const iconRef = ref(null);
    const svgCode = ref('');

    const loadingConfig = ref({
      body: props.body,
      fullscreen: props.fullscreen,
      lock: props.lock,
      text: props.text,
      background: props.background,
      spinner: props.spinner,
      svg: props.svg,
      svgViewBox: props.svgViewBox,
      customClass: props.customClass,
    });

    const show = () => {
      isVisible.value = true;
    };

    const hide = () => {
      isVisible.value = false;
    };

    const isSvgUrl = (name) => {
      return name && name.indexOf('/') !== -1 && /\.svg/i.test(name);
    };

    // 处理单个 path 元素的属性
    const getPathAttributes = (path: SVGPathElement) => {
      // 获取path上的所有属性
      return Array.from(path.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
    };

    // 生成 path 字符串
    const generatePathHtml = (attrs) => {
      const attrsString = _.reduce(attrs, (result, value, key) => {
        return value ? `${result} ${key}="${value}"` : result;
      }, '');
      return `<path ${attrsString}></path>`;
    };

    const generateSvgCode = (svg: Element) => {
      const viewBox = svg.getAttribute('viewBox');
      const paths = svg.querySelectorAll('path');
      if (paths.length) {
        const pathsHtml = Array.from(paths)
          .map((path: SVGPathElement) => generatePathHtml(getPathAttributes(path)))
          .join('');

        svgCode.value = pathsHtml;
        loadingConfig.value.svg = svgCode.value;
        loadingConfig.value.svgViewBox = props.svgViewBox || viewBox;

        return true;
      }
      return false;
    };

    // 处理在线 SVG
    const handleOnlineSvg = (onlineSpan: Element) => {
      const observer = new MutationObserver(() => {
        const onlineSvg = onlineSpan.querySelector('svg');
        if (onlineSvg) {
          const res = generateSvgCode(onlineSvg);
          if (res) {
            observer.disconnect();
          }
        }
      });

      observer.observe(onlineSpan, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    };

    // 检查元素是否存在
    const checkElement = (el: any) => (el?.$el ?? null);

    // 处理 SVG 类型
    const processSvgType = (element: Element | null) => {
      if (!element) return null;
      return isSvgUrl(props.svg)
        ? { type: 'online', el: element.querySelector('.el-icon--online') }
        : { type: 'normal', el: element.querySelector('svg') };
    };

    // 处理 SVG
    const processSvg = ({ type, el }: { type: string; el: Element | null }) => {
      if (!el) return;
      type === 'online' ? handleOnlineSvg(el) : generateSvgCode(el);
    };

    // 监听 visible prop 的变化
    watch(() => props.visible, (newVal) => {
      isVisible.value = newVal;
    }, { immediate: true });

    watch(iconRef, _.flow([
      checkElement,
      processSvgType,
      processSvg,
    ]));

    return {
      loadingConfig,
      isVisible,
      show,
      hide,
      iconRef,
    };
  },
  render() {
    return (
      <div>
        <ElIcon ref="iconRef" name={this.svg} style={{ display: 'none' }} />
        <div
          v-loading={this.isVisible ? this.loadingConfig : false}
        >
          {this.$slots.default?.()}
        </div>
      </div>
    );
  },
});

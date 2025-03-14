import { h, defineComponent, ref, onMounted, VNode, RendererNode, RendererElement } from 'vue';
import { ElIcon as ElIconPlus } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import _ from 'lodash';

// 检查是否是SVG URL
const isSvgUrl = (name) => {
  return name && name.indexOf('/') !== -1 && /\.svg/i.test(name);
};

// 在线SVG组件
const OnlineSvgIcon = defineComponent({
  name: 'OnlineSvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const svgContent = ref('');

    const fetchSvg = async () => {
      try {
        const response = await fetch(props.name);
        const text = await response.text();
        svgContent.value = text;
      } catch (error) {
        console.error('Failed to load SVG:', error);
      }
    };

    onMounted(fetchSvg);

    return () =>
      h('span', {
        class: 'el-icon--online',
        innerHTML: svgContent.value,
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
  },
});

export default defineComponent({
  name: 'ElIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    return () => {
      function renderChildren(): VNode<RendererNode, RendererElement> {
        if (isSvgUrl(props.name)) {
          return h(OnlineSvgIcon, {
            class: 'el-icon el-p-icon',
            name: props.name,
            size: props.size,
            color: props.color,
            style: {
              fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
              color: props.color,
              ...(attrs.style as object),
            },
            ...attrs,
          });
        }

        const iconName = _.capitalize(_.kebabCase(props.name));
        if (iconName && ElementPlusIconsVue[iconName]) {
          return h(ElementPlusIconsVue[iconName], {
            ...attrs,
          });
        }

        return h('i', {
          class: 'el-icon el-p-icon',
          style: {
            fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
            color: props.color,
            ...(attrs.style as object),
          },
          ...attrs,
        });
      }

      return (
        <ElIconPlus size={props.size} color={props.color}>
          {renderChildren()}
        </ElIconPlus>
      );
    };
  },
});

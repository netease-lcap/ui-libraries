import { h, defineComponent, ref, onMounted, VNode, RendererNode, RendererElement } from 'vue';
import { Icon as VanIconPlus } from 'vant';
import _ from 'lodash';

export interface VanIconProps {
  name: string;
  dot: boolean;
  badge: string;

}

export const VanIconPropsDefine = {
  name: {
    type: String,
    default: () => '',
  },
  dot: {
    type: Boolean,
    default: () => false,
  },
  badge: {
    type: String,
    default: () => '',
  },
};

// 检查是否是SVG URL
const isSvgUrl = (name) => {
  return name && name.indexOf('/') !== -1 && /\.svg/i.test(name);
};

// 在线SVG组件
const OnlineSvgIcon = defineComponent({
  name: 'OnlineSvgIcon',
  props: VanIconPropsDefine,
  setup(props: VanIconProps) {
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

    return () => (
      h(VanIconPlus, {
        name: '',
        dot: props.dot,
        badge: props.badge,
      }, [
        h('span', {
          innerHTML: svgContent.value,
          style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
        }),
      ])
    );
  },
});

export default defineComponent({
  name: 'VanIcon',
  props: VanIconPropsDefine,
  components: {
    OnlineSvgIcon,
  },
  setup(props: VanIconProps) {
    function renderChildren(): VNode<RendererNode, RendererElement> {
      // 处理SVG URL
      if (isSvgUrl(props.name)) {
        return h(OnlineSvgIcon, {
          name: props.name,
          dot: props.dot,
          badge: props.badge,
        });
      }
      return h(VanIconPlus, {
        name: props.name,
        dot: props.dot,
        badge: props.badge,
      });
    }
    return () => {
      return !props.name ? null : renderChildren();
    };
  },
});

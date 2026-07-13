import { h, defineComponent, ref, onMounted, VNode, RendererNode, RendererElement } from 'vue';
import { ElIcon as ElIconPlus } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import _ from 'lodash';

export interface ElIconProps {
  name: string;
  size: string | number;
  color: string;
  svg: string;
}

export const ElIconPropsDefine = {
  onClick: {
    type: Function,
    default: () => {},
  },
  color: {
    type: String,

    default: () => '',
  },
  size: {
    type: [String, Number],
    default: () => '',
  },
  name: {
    type: String,
    default: () => '',
  },
  svg: {
    type: String,
    default: () => '',
  },
};

// 检查是否是SVG URL
const isSvgUrl = (name) => {
  return name && name?.indexOf('/') !== -1 && /\.svg/i.test(name);
};

// 在线SVG组件
const OnlineSvgIcon = defineComponent({
  name: 'OnlineSvgIcon',
  props: ElIconPropsDefine,
  setup(props: ElIconProps) {
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
      <ElIconPlus {...props}>
        <span
          class="el-icon--online"
          innerHTML={svgContent.value}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        />
      </ElIconPlus>
    );
  },
});

export default defineComponent({
  name: 'ElIcon',
  props: ElIconPropsDefine,
  components: {
    OnlineSvgIcon,
    ...ElementPlusIconsVue,
  },
  setup(props: ElIconProps) {
    function renderSvgString(svg: string): VNode<RendererNode, RendererElement> {
      return (
        <ElIconPlus color={props.color} size={props.size}>
          <span
            class="el-icon--svg"
            innerHTML={svg}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </ElIconPlus>
      );
    }

    function renderChildren(): VNode<RendererNode, RendererElement> {
      // 直接传入 SVG 字符串时按 HTML 渲染
      if (props.svg) {
        return renderSvgString(props.svg);
      }

      // 处理SVG URL
      if (isSvgUrl(props.name)) {
        return <OnlineSvgIcon {...props} />;
      }

      let iconComponent = null;

      if (ElementPlusIconsVue[props.name]) {
        iconComponent = ElementPlusIconsVue[props.name];
      } else {
        const pascalName = _.upperFirst(_.camelCase(props.name));
        if (ElementPlusIconsVue[pascalName]) {
          iconComponent = ElementPlusIconsVue[pascalName];
        }
      }

      return <ElIconPlus color={props.color} size={props.size}>{iconComponent ? h(iconComponent, props) : null}</ElIconPlus>;
    }
    return () => {
      return !props.name && !props.svg ? null : renderChildren();
    };
  },
});

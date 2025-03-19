import { h, defineComponent, ref, onMounted, VNode, RendererNode, RendererElement } from 'vue';
import { ElIcon as ElIconPlus } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export interface ElIconProps {
  name: string;
}

export const ElIconPropsDefine = {
  name: {
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
      <ElIconPlus>
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
    function renderChildren(): VNode<RendererNode, RendererElement> {
      if (isSvgUrl(props.name)) {
        return <OnlineSvgIcon name={props.name} />;
      }

      if (props.name && ElementPlusIconsVue[props.name]) {
        return <ElIconPlus>{h(ElementPlusIconsVue[props.name])}</ElIconPlus>;
      }

      return <ElIconPlus>{props.name}</ElIconPlus>;
    }
    return () => {
      return (
        <ElIconPlus>
          {renderChildren()}
        </ElIconPlus>
      );
    };
  },
});

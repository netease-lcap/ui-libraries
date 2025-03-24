import { h, defineComponent, ref, onMounted, VNode, RendererNode, RendererElement } from 'vue';
import { ElIcon as ElIconPlus } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import _ from 'lodash';

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
      if (!props.name) {
        return <ElIconPlus />;
      }

      // 处理SVG URL
      if (isSvgUrl(props.name)) {
        return <OnlineSvgIcon name={props.name} />;
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

      return <ElIconPlus>{iconComponent ? h(iconComponent) : props.name}</ElIconPlus>;
    }
    return () => {
      return <ElIconPlus>{renderChildren()}</ElIconPlus>;
    };
  },
});

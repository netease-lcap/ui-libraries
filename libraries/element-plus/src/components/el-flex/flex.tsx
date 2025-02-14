import {
  computed,
  defineComponent,
  isVNode,
  cloneVNode,
} from 'vue';
import { ElFlexPropsDefine, type ElFlexProps } from './props';
import { useChildSlots } from './hooks';
import './index.css';

export default defineComponent({
  name: 'ElFlex',
  props: ElFlexPropsDefine,
  setup(props: ElFlexProps) {
    const getChildSlots = useChildSlots();

    const style = computed(() => {
      return props.mode === 'flex' ? {
        flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
        justifyContent: props.justify,
        alignItems: props.alignment,
        flexWrap: props.wrap ? 'wrap' : 'nowrap',
        gap: `${props.gutter}px`,
      } : {};
    });

    function renderChildren() {
      const children: any[] = getChildSlots();

      if (props.mode === 'flex') {
        return children;
      }

      return children
        .filter((child) => (isVNode(child) ? child.type !== Comment : true))
        .map((child) => {
          return cloneVNode(child, {
            style: {
              [props.direction === 'horizontal' ? 'marginRight' : 'marginBottom']: `${props.gutter}px`,
            },
          });
        });
    }

    return () => {
      return (
        <div
          style={style.value}
          class={props.mode === 'flex' ? 'el-flex' : 'el-flex--block'}
        >
          {renderChildren()}
        </div>
      );
    };
  },
});

import { computed, defineComponent, isVNode, cloneVNode, inject } from 'vue';
import { formContextKey } from 'element-plus';
import { ElFlexPropsDefine, type ElFlexProps } from './props';
import { useChildSlots } from './hooks';
import './index.css';

export default defineComponent({
  name: 'ElFlex',
  props: ElFlexPropsDefine,
  setup(props: ElFlexProps) {
    const getChildSlots = useChildSlots();
    const formContext = inject(formContextKey);


    const style = computed(() => {
      return props.mode === 'flex'
        ? {
            flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
            justifyContent: props.justify,
            alignItems: props.alignment,
            flexWrap: props.wrap ? 'wrap' : 'nowrap',
            '--el-flex-form-label-width':
              formContext?.labelWidth === 'auto' ? formContext?.autoLabelWidth : formContext?.labelWidth,
            gap: `${props.gutter}px`,
          }
        : {};
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
        <div style={style.value as any} class={props.mode === 'flex' ? 'el-flex' : 'el-flex--block'}>
          {renderChildren()}
        </div>
      );
    };
  },
});

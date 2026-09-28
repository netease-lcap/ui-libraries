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
      // 换行默认：横向 true，竖向 false；显式传入 wrap 时优先生效
      const wrap = props.wrap ?? props.direction === 'horizontal';
      return ['flex', 'form-flex'].includes(props.mode ?? '')
        ? {
            flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
            justifyContent: props.justify,
            alignItems: props.alignment,
            flexWrap: wrap ? 'wrap' : 'nowrap',
            '--el-flex-form-label-width':
              formContext?.labelWidth === 'auto' ? formContext?.autoLabelWidth : formContext?.labelWidth,
            gap: `${props.gutter}px`,
          }
        : {};
    });

    function renderChildren() {
      const children: any[] = getChildSlots();

      // if (['flex', 'form-flex'].includes(props.mode ?? '')) {
      return children;
      // }

      // return children
      //   .filter((child) => (isVNode(child) ? child.type !== Comment : true))
      //   .map((child) => {
      //     return cloneVNode(child, {
      //       style: {
      //         [props.direction === 'horizontal' ? 'marginRight' : 'marginBottom']: `${props.gutter}px`,
      //       },
      //     });
      //   });
    }

    return () => {
      return (
        <div
          style={style.value as any}
          class={[
            props.mode === 'flex' ? 'el-flex' : 'el-flex--block',
            props.mode === 'form-flex' ? 'el-form-flex' : '',
          ]}
        >
          {renderChildren()}
        </div>
      );
    };
  },
});

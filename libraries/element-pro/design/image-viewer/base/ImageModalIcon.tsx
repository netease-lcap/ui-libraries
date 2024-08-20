import { computed, defineComponent, PropType } from '@vue/composition-api';
import { usePrefixClass } from '../../hooks/useConfig';
import { ElNode } from '../../common';
import { useElNodeJSX } from '../../hooks/tnode';

const propHandler = {
  type: Function as PropType<(e: MouseEvent) => void>,
  default() {
    return () => {};
  },
};

export default defineComponent({
  name: 'ElImageModalIcon',
  props: {
    disabled: Boolean,
    clickHandler: propHandler,
    label: String,
    icon: Function as PropType<ElNode>,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const renderElNodeJSX = useElNodeJSX();
    const wrapClass = computed(() => [
      `${classPrefix.value}-image-viewer__modal-icon`,
      {
        [`${classPrefix.value}-is-disabled`]: props.disabled,
      },
    ]);

    return {
      wrapClass,
      classPrefix,
      renderElNodeJSX,
    };
  },
  render() {
    return (
      <div class={this.wrapClass} onClick={this.clickHandler}>
        {this.renderElNodeJSX('icon')}
        {this.label && <span class={`${this.classPrefix}-image-viewer__modal-icon-label`}>{this.label}</span>}
      </div>
    );
  },
});

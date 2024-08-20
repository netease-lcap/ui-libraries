import {
  computed, defineComponent, toRefs, inject,
} from '@vue/composition-api';
import Vue from 'vue';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import props from './option-group-props';
import { ClassName } from '../common';
import { ElOptionGroupProps } from './type';
import { useElNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useConfig } from '../config-provider/useConfig';
import useCommonClassName from '../hooks/useCommonClassName';

export interface Select extends Vue {
  tSelect: {
    size: string;
  };
}

export default defineComponent({
  name: 'ElOptionGroup',
  props: { ...props },
  setup(props: ElOptionGroupProps) {
    const { divider } = toRefs(props);
    const tSelect: any = inject('tSelect');
    const { sizeClassNames } = useCommonClassName();
    const COMPONENT_NAME = usePrefixClass('select');
    const { classPrefix } = useConfig('classPrefix');

    const classes = computed<ClassName>(() => [
      `${COMPONENT_NAME.value}-option-group`,
      {
        [sizeClassNames[tSelect.size]]: tSelect && tSelect.size,
        [`${COMPONENT_NAME.value}-option-group__divider`]: divider,
      },
    ]);
    return {
      classes,
      classPrefix,
      componentName: COMPONENT_NAME,
    };
  },
  render() {
    const renderElNode = useElNodeJSX();
    const children: ScopedSlotReturnValue = renderElNode('default');
    return (
      <li class={this.classes}>
        <div class={`${this.componentName}-option-group__header`}>{this.label}</div>
        {children}
      </li>
    );
  },
});

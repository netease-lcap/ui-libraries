import { PropType, VNode } from 'vue';
import { ClassName } from '../common';
import { renderElNodeJSX } from '../utils/render-tnode';
import { getClassPrefixMixins } from '../config-provider/config-receiver';
import mixins from '../utils/mixins';

const classPrefixMixins = getClassPrefixMixins('input-group');

export default mixins(classPrefixMixins).extend({
  name: 'ElInputGroup',
  props: {
    separate: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  computed: {
    classes(): ClassName {
      return [
        this.componentName,
        {
          [`${this.componentName}--separate`]: this.separate,
        },
      ];
    },
  },
  render(): VNode {
    return <div class={this.classes}>{renderElNodeJSX(this, 'default')}</div>;
  },
});

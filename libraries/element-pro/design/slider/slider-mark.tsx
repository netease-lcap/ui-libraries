import { PropType } from 'vue';
import { ElSliderProps } from './type';
import { getClassPrefixMixins } from '../config-provider/config-receiver';
import mixins from '../utils/mixins';

const classPrefixMixins = getClassPrefixMixins('slider');

export default mixins(classPrefixMixins).extend({
  name: 'ElSliderMark',
  props: {
    mark: {
      type: [Object, Array, String] as PropType<ElSliderProps['marks']>,
    },
    point: {
      type: Number,
    },
  },
  methods: {
    changeValue(event: MouseEvent) {
      event.stopPropagation();
      this.$emit('change-value', this.point);
    },
  },
  render() {
    const label = this.mark;
    return (
      <div class={`${this.componentName}__mark-text`} onClick={this.changeValue}>
        {label}
      </div>
    );
  },
});

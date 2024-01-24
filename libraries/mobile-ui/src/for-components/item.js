import { createNamespace } from '../utils';

const [createComponent, bem] = createNamespace('for-components-item');

export default createComponent({
  props: {
    item: {
      type: [Object, String, Number],
    },
    index: {
      type: [Object, String, Number],
    },
    colnum: {
      type: Number,
    },
    equalWidth: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    comStyle() {
      if (this.colnum && this.equalWidth) {
        const num = this.colnum;
        const width = 100 / num;
        return {
          width: width + '%',
        };
      }
      return {};
    },
  },
  render() {
    return (
      <div class={bem()} style={this.comStyle}>
        {this.slots('default', {
          item: this.item,
          index: this.index,
        })}
      </div>
    );
  }
});

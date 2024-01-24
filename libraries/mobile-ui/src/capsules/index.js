import { createNamespace } from '../utils'
import { ParentMixin } from '../mixins/relation'

const [createComponent, bem] = createNamespace('capsules')

export default createComponent({
  mixins: [ParentMixin('VanCapsules')],
  props: {
    value: {
      type: [String, Array],
    },
    autoSelect: {
      type: Boolean,
      default: false,
    },
    cancelable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentValue: this.value,
    };
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit('update:value', val);
      this.$emit('change', { value: val });
    }
  },

  methods: {
    onSelect(val) {
      let value;

      if (this.multiple) {
        const data = this.currentValue || [];

        const optionIndex = data.indexOf(val);
        if (optionIndex === -1) {
          data.push(val);
        } else if (this.cancelable) {
          data.splice(optionIndex, 1);
        }

        value = data;
      } else if (this.cancelable) {
        value = this.currentValue === val ? null : val;
      } else {
        value = val;
      }

      this.currentValue = value;
      this.$emit('select', { value });
    },

    renderSlots() {
      if (this.inDesigner() && !this.slots()) {
        return (
          <div style="text-align: center; height: 40px; line-height: 40px; width:100vw; background: #eceff7">
            选中组件，点击“+”添加组件
          </div>
        );
      }

      return this.slots();
    }
  },
  render() {
    return <div class={bem()}>{this.renderSlots()}</div>;
  },
});

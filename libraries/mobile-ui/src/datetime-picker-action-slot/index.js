import { EmptyCol } from '../emptycol';
import { createNamespace } from '../utils';

const [createComponent] = createNamespace('datetime-picker-action-slot');

export default createComponent({
  props: {
    targetMethod: {
      type: String,
      default: 'confirm',
    },
  },

  inject: {
    execEventSlotCommand: {
      default: null,
    },
  },

  methods: {
    handleClick() {
      // readme: 这时反模式，但目前相较于props传值的方式，这样兼容性更好
      if (
        this.execEventSlotCommand &&
        typeof this.execEventSlotCommand === 'function'
      ) {
        this.execEventSlotCommand(this.targetMethod);
      }
    },
  },

  render() {
    let defaultSlot = this.slots();
    if (this.inDesigner()) {
      if (!defaultSlot) {
        defaultSlot = <EmptyCol></EmptyCol>;
      }
    }

    if (!defaultSlot) return null;

    return (
      <div onClick={this.handleClick} vusion-slot-name="default">
        {defaultSlot}
      </div>
    );
  },
});

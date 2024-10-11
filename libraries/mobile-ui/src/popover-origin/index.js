import { createPopper, offsetModifier } from '@vant/popperjs';
import { createNamespace } from '../utils';

// Mixins
import { ClickOutsideMixin } from '../mixins/click-outside';
import { ParentMixin } from '../mixins/relation';

// Components
import Popup from '../popup';
import VanEmptyCol from '../emptycol/index';

const [createComponent, bem] = createNamespace('popover-origin');

export default createComponent({
  mixins: [
    ClickOutsideMixin({
      event: 'touchstart',
      method: 'onClickOutside',
    }),
    ParentMixin('vanPopover'),
  ],

  props: {
    value: Boolean,
    trigger: {
      type: String,
      default: 'click',
    },
    overlay: Boolean,
    offset: {
      type: Array,
      default: () => [0, 8],
    },
    theme: {
      type: String,
      default: 'light',
    },
    actions: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
      default: 'bottom-start',
    },
    getContainer: {
      type: [String, Function],
      default: 'body',
    },
    closeOnClickAction: {
      type: Boolean,
      default: true,
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
    placement() {
      this.updateLocation();
    },
    currentValue() {
      this.updateLocation();
    },
  },

  mounted() {
    this.updateLocation();
  },

  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },

  methods: {
    createPopper() {
      return createPopper(this.$refs.wrapper, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          {
            ...offsetModifier,
            options: {
              offset: this.offset,
            },
          },
        ],
      });
    },

    updateLocation() {
      this.$nextTick(() => {
        if (!this.currentValue) {
          return;
        }

        if (!this.popper) {
          this.popper = this.createPopper();
        } else {
          this.popper.setOptions({
            placement: this.placement,
          });
        }
      });
    },

    open() {
      this.currentValue = true;
      this.$emit('update:value', true);
    },

    close() {
      this.currentValue = false;
      this.$emit('update:value', false);
    },

    onToggle(value) {
      this.currentValue = value;
      this.$emit('update:value', value);
    },

    onClickWrapper() {
      if (this.trigger === 'click') {
        this.onToggle(!this.currentValue);
      }
    },

    onTouchstart(event) {
      event.stopPropagation();
      this.$emit('touchstart', event);
    },

    onClickOutside() {
      this.currentValue = false;
      this.$emit('update:value', false);
    },

    onOpen() {
      this.$emit('open');
    },

    /* istanbul ignore next */
    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    /* istanbul ignore next */
    onClosed() {
      this.$emit('closed');
    },
  },

  render() {
    return (
      <span ref="wrapper" class={bem('wrapper')} onClick={this.onClickWrapper} vusion-slot-name="reference" vusion-click-enabled>
        {this.inDesigner() ? (this.slots('reference') || <VanEmptyCol />) : this.slots('reference')}

        <Popup
          ref="popover"
          vModel={this.currentValue}
          class={bem([this.theme])}
          overlay={this.overlay}
          position={null}
          transition="van-popover-zoom"
          lockScroll={false}
          getContainer={this.getContainer}
          onOpen={this.onOpen}
          onClose={this.onClose}
          onInput={this.onToggle}
          onOpened={this.onOpened}
          onClosed={this.onClosed}
          nativeOnTouchstart={this.onTouchstart}
        >
          <div class={bem('arrow')} />
          <div class={bem('content')} role="menu" vusion-slot-name="default">
            {this.inDesigner() ? (this.slots('default') || <VanEmptyCol />) : this.slots('default')}
          </div>
        </Popup>
      </span>
    );
  },
});

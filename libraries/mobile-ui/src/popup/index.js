import { sync } from '@lcap/vue2-utils';
import { createNamespace, isDef } from '../utils';
import { PopupMixin } from '../mixins/popup';
import Icon from '../icon';

const [createComponent, bem] = createNamespace('popup');

export default createComponent({
  mixins: [
    PopupMixin({ independInDesigner: true }),
    sync({
      visible: 'realValue',
    }),
  ],

  props: {
    round: Boolean,
    duration: [Number, String],
    closeable: Boolean,
    transition: String,
    safeAreaInsetBottom: Boolean,
    closeIcon: {
      type: String,
      default: 'cross',
    },
    closeIconPosition: {
      type: String,
      default: 'top-right',
    },
    position: {
      type: String,
      default: 'center',
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
    designTitle: String,
  },

  beforeCreate() {
    const createEmitter = (eventName) => (event) =>
      this.$emit(eventName, event);

    this.onClick = createEmitter('click');
    this.onOpened = createEmitter('opened');
    this.onClosed = createEmitter('closed');
  },

  methods: {
    onClickCloseIcon(event) {
      this.$emit('click-close-icon', event);
      this.close();
    },
    openModal() {
      this.realValue = true;
    },
    closeModal() {
      this.realValue = false;
    },
    togglePModal() {
      this.realValue = !this.realValue;
    }
  },

  render() {
    // this.$env = {};
    // this.$env.VUE_APP_DESIGNER = true;
    if (!this.shouldRender) {
      return;
    }
    const { round, position, duration } = this;
    const isCenter = position === 'center';

    const transitionName =
      this.transition ||
      (isCenter ? 'van-fade' : `van-popup-slide-${position}`);

    const style = {};
    if (isDef(duration)) {
      const key = isCenter ? 'animationDuration' : 'transitionDuration';
      style[key] = `${duration}s`;
    }

    return (
      <transition
        appear={this.transitionAppear}
        name={transitionName}
        onAfterEnter={this.onOpened}
        onAfterLeave={this.onClosed}
      >
        <div
          vShow={this.realValue}
          style={style}
          class={[bem({
            round,
            [position]: position,
            'safe-area-inset-bottom': this.safeAreaInsetBottom,
          }), 'noforvant']}
          onClick={this.onClick}
          empty={!this.$slots.default}
        >
          {this.slots('inject')}
          {this.slots()}
          {this.closeable && (
            <Icon
              role="button"
              tabindex="0"
              name={this.closeIcon}
              class={bem('close-icon', this.closeIconPosition)}
              onClick={this.onClickCloseIcon}
            />
          )}
        </div>
      </transition>
    );
  },
});

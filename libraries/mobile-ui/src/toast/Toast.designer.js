// Utils
import { createNamespace, isDef } from '../utils';
import { lockClick } from './lock-click';

// Mixins
import { PopupMixin } from '../mixins/popup';

// Components
import Icon from '../icon';
import Iconv from '../iconv';
import Loading from '../loading';

const [createComponent, bem] = createNamespace('toast-designer');

export default createComponent({
  mixins: [PopupMixin()],

  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'text',
    },
    position: {
      type: String,
      default: 'middle',
    },
    transition: {
      type: String,
      default: 'van-fade',
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },

    customIcon: String,
  },

  data() {
    return {
      clickable: false,
    };
  },

  mounted() {
    this.toggleClickable();
  },

  destroyed() {
    this.toggleClickable();
  },

  watch: {
    value: 'toggleClickable',
    forbidClick: 'toggleClickable',
  },

  methods: {
    onClick() {
      if (this.closeOnClick) {
        this.close();
      }
    },

    toggleClickable() {
      const clickable = this.value && this.forbidClick;

      if (this.clickable !== clickable) {
        this.clickable = clickable;
        lockClick(clickable);
      }
    },

    /* istanbul ignore next */
    onAfterEnter() {
      this.$emit('opened');

      if (this.onOpened) {
        this.onOpened();
      }
    },

    onAfterLeave() {
      this.$emit('closed');
    },

    genIcon() {
      const { type, loadingType, customIcon } = this;

      if (type === 'custom') {
        if (customIcon) {
          return <Iconv class={bem('custom-icon')} icotype="only" name={customIcon}></Iconv>;
        }

        return null;
      }

      if (type === 'loading') {
        return <Loading class={bem('loading')} type={loadingType} />;
      }

      let name = type;
      let color;
      if (type === 'success') {
        color = '#26bd71';
      } else if (type === 'fail') {
        color = '#f24957';
      } else if (type === 'warning') {
        name = 'info';
        color = '#ffb21a';
      }

      const hasIcon = name;

      if (hasIcon) {
        return (
          <Iconv class={bem('icon')} icotype="only" name={name} color={color} />
        );
      }
    },

    genMessage() {
      const { type, message } = this;

      if (!isDef(message) || message === '') {
        return;
      }

      if (type === 'html') {
        return <div class={bem('text')} domPropsInnerHTML={message} />;
      }

      return <div class={bem('text')}>{message}</div>;
    },
  },

  render() {
    let { type } = this
    if (this.type === 'custom' && !this.customIcon) {
      type = 'text';
    }

    return (
      <transition
        name={this.transition}
        onAfterEnter={this.onAfterEnter}
        onAfterLeave={this.onAfterLeave}
      >
        <div
          vShow={this.realValue}
          class={[
            bem([this.position, { [type]: !this.icon }]),
            this.className,
          ]}
          onClick={this.onClick}
        >
          {this.slots('inject')}
          {this.genIcon()}
          {this.genMessage()}
        </div>
      </transition>
    );
  },
});

// Utils
import { createNamespace, isDef } from '../utils';
import { range } from '../utils/format/number';
import { preventDefault } from '../utils/dom/event';

// Mixins
import { TouchMixin } from '../mixins/touch';
import { ClickOutsideMixin } from '../mixins/click-outside';
// eslint-disable-next-line import/no-named-as-default
import EmptyCol from '../emptycol';

const [createComponent, bem] = createNamespace('swipe-cell');
const THRESHOLD = 0.15;

export default createComponent({
  mixins: [
    TouchMixin,
    ClickOutsideMixin({
      event: 'touchstart',
      method: 'onClick',
    }),
  ],

  props: {
    // @deprecated
    // should be removed in next major version, use beforeClose instead
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: '',
    },
    leftforhelper: Boolean,
    rightforhelper: Boolean,
  },

  data() {
    return {
      offset: 0,
      dragging: false,
      position: '',
    };
  },
  components: {
    EmptyCol,
  },

  computed: {},
  mounted() {
    this.bindTouchEvent(this.$el);
  },
  updated() {
    if (this.opened && this.inDesigner()) {
      const offset =
        this.position === 'left'
          ? this.computedLeftWidth()
          : -this.computedRightWidth();
      this.offset = offset;
    }
  },
  methods: {
    computedLeftWidth() {
      if (isDef(this.leftWidth) && this.leftWidth !== 'auto') {
        return +this.leftWidth;
      }
      return this.getWidthByRef('left');
    },

    computedRightWidth() {
      if (isDef(this.rightWidth) && this.leftWidth !== 'auto') {
        return +this.rightWidth;
      }
      return this.getWidthByRef('right');
    },
    getWidthByRef(ref) {
      if (this.$refs[ref]) {
        const rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }
      return 0;
    },

    // @exposed-api
    open(position) {
      const offset =
        position === 'left'
          ? this.computedLeftWidth()
          : -this.computedRightWidth();

      this.opened = true;
      this.offset = offset;
      this.position = position;
      this.$emit('open', {
        position,
        name: this.name,
        // @deprecated
        // should be removed in next major version
        detail: this.name,
      });
    },

    // @exposed-api
    close(position) {
      this.offset = 0;
      this.position = '';
      if (this.opened) {
        this.opened = false;
        this.$emit('close', {
          position,
          name: this.name,
        });
      }
    },

    onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },

    onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        this.dragging = true;
        this.lockClick = true;

        const isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          preventDefault(event, this.stopPropagation);
        }

        this.offset = range(
          this.deltaX + this.startOffset,
          -this.computedRightWidth(),
          this.computedLeftWidth()
        );
      }
    },

    onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? 'left' : 'right');
        this.dragging = false;

        // compatible with desktop scenario
        setTimeout(() => {
          this.lockClick = false;
        }, 0);
      }
    },

    toggle(direction) {
      const offset = Math.abs(this.offset);
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      const { computedLeftWidth, computedRightWidth } = this;

      if (
        computedRightWidth() &&
        direction === 'right' &&
        offset > computedRightWidth() * threshold
      ) {
        this.open('right');
      } else if (
        computedLeftWidth() &&
        direction === 'left' &&
        offset > computedLeftWidth() * threshold
      ) {
        this.open('left');
      } else {
        this.close();
      }
    },

    onClick(position = 'outside') {
      if (position !== 'outside') {
        this.$emit('click', position);
      }

      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position,
            name: this.name,
            instance: this,
          });
        } else if (this.onClose) {
          this.onClose(position, this, { name: this.name });
        } else {
          this.close(position);
        }
      }
    },

    getClickHandler(position, stop) {
      return (event) => {
        if (stop) {
          event.stopPropagation();
        }
        this.onClick(position);
      };
    },

    genLeftPart() {
      const content = this.slots('left');

      if (content) {
        return (
          <div
            ref="left"
            class={bem('left')}
            onClick={this.getClickHandler('left', true)}
          >
            {content}
          </div>
        );
      }
      if (this.inDesigner()) {
        return (
          <div
            ref="left"
            class={bem('left')}
            onClick={this.getClickHandler('left', true)}
            vusion-slot-name="left"
            style={{ width: `${Math.abs(this.offset)}px` }}
            vusion-template-left-node-path={
              this.$attrs['vusion-template-left-node-path']
            }
          >
            <van-empty-col></van-empty-col>
          </div>
        );
      }
    },

    genRightPart() {
      const content = this.slots('right');
      if (content) {
        return (
          <div
            ref="right"
            class={bem('right')}
            onClick={this.getClickHandler('right', true)}
          >
            {content}
          </div>
        );
      }
      if (this.inDesigner()) {
        return (
          <div
            ref="right"
            class={bem('right')}
            onClick={this.getClickHandler('right', true)}
            vusion-slot-name="right"
            style={{ width: `${Math.abs(this.offset)}px` }}
            vusion-template-right-node-path={
              this.$attrs['vusion-template-right-node-path']
            }
          >
            <van-empty-col></van-empty-col>
          </div>
        );
      }
    },
  },

  render() {
    if (this.inDesigner()) this.dragging = true;
    const wrapperStyle = {
      transform: `translate3d(${this.offset}px, 0, 0)`,
      transitionDuration: this.dragging ? '0s' : '.6s',
    };
    return (
      <div class={bem()} onClick={this.getClickHandler('cell')}>
        <div class={bem('wrapper')} style={wrapperStyle}>
          {this.genLeftPart()}
          {this.slots()}
          {this.inDesigner() && !this.slots() ? (
            <div vusion-slot-name="default">
              <van-empty-col></van-empty-col>
            </div>
          ) : null}
          {this.genRightPart()}
        </div>
      </div>
    );
  },
});

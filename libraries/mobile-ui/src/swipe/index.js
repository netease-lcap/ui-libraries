// Utils
import { createNamespace } from '../utils';
import { isHidden } from '../utils/dom/style';
import { preventDefault } from '../utils/dom/event';
import { doubleRaf } from '../utils/dom/raf';
import { range } from '../utils/format/number';

// Mixins
import { TouchMixin } from '../mixins/touch';
import { ParentMixin } from '../mixins/relation';
import { BindEventMixin } from '../mixins/bind-event';
import DataSourceMixin from '../mixins/DataSource';

const [createComponent, bem] = createNamespace('swipe');

export default createComponent({
  mixins: [
    DataSourceMixin,
    TouchMixin,
    ParentMixin('vanSwipe'),
    BindEventMixin(function (bind, isBind) {
      bind(window, 'resize', this.resize, true);
      bind(window, 'orientationchange', this.resize, true);
      bind(window, 'visibilitychange', this.onVisibilityChange);

      if (isBind) {
        this.initialize();
      } else {
        this.clear();
      }
    }),
  ],

  props: {
    width: [Number, String],
    height: [Number, String],
    autoplay: [Number, String],
    vertical: Boolean,
    lazyRender: Boolean,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: [Number, String],
      default: 500,
    },
    touchable: {
      type: Boolean,
      default: true,
    },
    initialSwipe: {
      type: [Number, String],
      default: 0,
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
    stopPropagation: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      rect: null,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swiping: false,
      computedWidth: 0,
      computedHeight: 0,
    };
  },
  watch: {
    children() {
      this.initialize();
    },

    initialSwipe() {
      this.initialize();
    },

    autoplay(autoplay) {
      if (autoplay > 0) {
        this.autoPlay();
      } else {
        this.clear();
      }
    },
  },

  computed: {
    count() {
      return this.children.length;
    },

    maxCount() {
      return Math.ceil(Math.abs(this.minOffset) / this.size);
    },

    delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },

    size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth'];
    },

    trackSize() {
      return this.count * this.size;
    },

    activeIndicator() {
      return (this.active + this.count) % this.count;
    },

    isCorrectDirection() {
      const expect = this.vertical ? 'vertical' : 'horizontal';
      return this.direction === expect;
    },

    trackStyle() {
      const style = {
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`,
      };

      if (this.size) {
        const mainAxis = this.vertical ? 'height' : 'width';
        const crossAxis = this.vertical ? 'width' : 'height';
        style[mainAxis] = `${this.trackSize}px`;
        style[crossAxis] = this[crossAxis] ? `${this[crossAxis]}px` : '';
      }

      return style;
    },

    indicatorStyle() {
      return {
        // backgroundColor: '#337EFF' || this.indicatorColor,
      };
    },

    minOffset() {
      return (
        (this.vertical ? this.rect.height : this.rect.width) -
        this.size * this.count
      );
    },
  },

  mounted() {
    this.bindTouchEvent(this.$refs.track);
  },

  methods: {
    // initialize swipe position
    initialize(active = +this.initialSwipe) {
      if (!this.$el || isHidden(this.$el)) {
        return;
      }

      clearTimeout(this.timer);

      const rect = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight,
      };

      this.rect = rect;
      this.swiping = true;
      this.active = active;
      this.computedWidth = +this.width || rect.width;
      this.computedHeight = +this.height || rect.height;
      this.offset = this.getTargetOffset(active);
      this.children.forEach((swipe) => {
        swipe.offset = 0;
      });
      this.autoPlay();
    },

    // @exposed-api
    resize() {
      this.initialize(this.activeIndicator);
    },

    onVisibilityChange() {
      if (document.hidden) {
        this.clear();
      } else {
        this.autoPlay();
      }
    },

    onTouchStart(event) {
      if (!this.touchable) return;

      this.clear();
      this.touchStartTime = Date.now();
      this.touchStart(event);
      this.correctPosition();
    },

    onTouchMove(event) {
      if (!this.touchable || !this.swiping) return;

      this.touchMove(event);
      // if user starting to touchmove, prevent the event bubbling to
      // avoid affecting the parent components
      const shouldPrevent =
        this.isCorrectDirection ||
        this.offsetY > this.offsetX === this.vertical;
      if (shouldPrevent) {
        preventDefault(event, this.stopPropagation);
      }

      if (this.isCorrectDirection) {
        this.move({ offset: this.delta });
      }
    },

    onTouchEnd() {
      if (!this.touchable || !this.swiping) return;

      const { size, delta } = this;
      const duration = Date.now() - this.touchStartTime;
      const speed = delta / duration;
      const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > size / 2;

      if (shouldSwipe && this.isCorrectDirection) {
        const offset = this.vertical ? this.offsetY : this.offsetX;

        let pace = 0;

        if (this.loop) {
          pace = offset > 0 ? (delta > 0 ? -1 : 1) : 0;
        } else {
          pace = -Math[delta > 0 ? 'ceil' : 'floor'](delta / size);
        }

        this.move({
          pace,
          emitChange: true,
        });
      } else if (delta) {
        this.move({ pace: 0 });
      }

      this.swiping = false;
      this.autoPlay();
    },

    getTargetActive(pace) {
      const { active, count, maxCount } = this;

      if (pace) {
        if (this.loop) {
          return range(active + pace, -1, count);
        }

        return range(active + pace, 0, maxCount);
      }

      return active;
    },

    getTargetOffset(targetActive, offset = 0) {
      let currentPosition = targetActive * this.size;
      if (!this.loop) {
        currentPosition = Math.min(currentPosition, -this.minOffset);
      }

      let targetOffset = offset - currentPosition;
      if (!this.loop) {
        targetOffset = range(targetOffset, this.minOffset, 0);
      }

      return targetOffset;
    },

    move({ pace = 0, offset = 0, emitChange }) {
      const { loop, count, active, children, trackSize, minOffset } = this;

      if (count <= 1) {
        return;
      }

      const targetActive = this.getTargetActive(pace);
      const targetOffset = this.getTargetOffset(targetActive, offset);

      // auto move first and last swipe in loop mode
      if (loop) {
        if (children[0] && targetOffset !== minOffset) {
          const outRightBound = targetOffset < minOffset;
          children[0].offset = outRightBound ? trackSize : 0;
        }

        if (children[count - 1] && targetOffset !== 0) {
          const outLeftBound = targetOffset > 0;
          children[count - 1].offset = outLeftBound ? -trackSize : 0;
        }
      }

      this.active = targetActive;
      this.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        this.$emit('change', this.activeIndicator);
      }
    },

    // @exposed-api
    prev() {
      this.correctPosition();
      this.resetTouchStatus();

      doubleRaf(() => {
        this.swiping = false;
        this.move({
          pace: -1,
          emitChange: true,
        });
      });
    },

    // @exposed-api
    next() {
      this.correctPosition();
      this.resetTouchStatus();

      doubleRaf(() => {
        this.swiping = false;
        this.move({
          pace: 1,
          emitChange: true,
        });
      });
    },

    // @exposed-api
    swipeTo(index, options = {}) {
      this.correctPosition();
      this.resetTouchStatus();

      doubleRaf(() => {
        let targetIndex;
        if (this.loop && index === this.count) {
          targetIndex = this.active === 0 ? 0 : index;
        } else {
          targetIndex = index % this.count;
        }

        if (options.immediate) {
          doubleRaf(() => {
            this.swiping = false;
          });
        } else {
          this.swiping = false;
        }

        this.move({
          pace: targetIndex - this.active,
          emitChange: true,
        });
      });
    },

    correctPosition() {
      this.swiping = true;

      if (this.active <= -1) {
        this.move({ pace: this.count });
      }

      if (this.active >= this.count) {
        this.move({ pace: -this.count });
      }
    },

    clear() {
      clearTimeout(this.timer);
    },

    autoPlay() {
      if (this.inDesigner()) {
        return;
      }
      const { autoplay } = this;

      if (autoplay > 0 && this.count > 1) {
        this.clear();
        this.timer = setTimeout(() => {
          this.next();
          this.autoPlay();
        }, autoplay);
      }
    },
    clickIndicator(index) {
      this.swipeTo(index);
    },
    genIndicator() {
      const { count, activeIndicator } = this;
      const slot = this.slots('indicator');
      const _this = this;
      if (slot) {
        return slot;
      }

      if (this.showIndicators && count > 1) {
        if (this.inDesigner()) {
          return (
            <div class={bem('indicators', { vertical: this.vertical })}>
              {Array(...Array(count)).map((empty, index) => (
                <i
                  vusion-click-enabled
                  can-nodeinfo
                  index={index}
                  class={bem('indicator', { active: index === activeIndicator })}
                  style={index === activeIndicator ? this.indicatorStyle : null}
                  onClick={() => _this.clickIndicator(index)}
                />
              ))}
            </div>
          );
        }
        return (
          <div class={bem('indicators', { vertical: this.vertical })}>
            {Array(...Array(count)).map((empty, index) => (
              <i
                index={index}
                class={bem('indicator', { active: index === activeIndicator })}
                style={index === activeIndicator ? this.indicatorStyle : null}
                onClick={() => _this.clickIndicator(index)}
              />
            ))}
          </div>
        );
      }
    },

    renderDataSource() {
      return this.currentData?.map((item, index) => {
        return this.slots('item', { item, index });
      });
    },

    renderNormal() {
      return this.slots();
    },
  },

  render() {
    return (
      <div class={bem()}>
        <div
          ref="track"
          style={this.trackStyle}
          class={bem('track', { vertical: this.vertical })}
        >
          {this.dataSource !== undefined
            ? this.renderDataSource()
            : this.renderNormal()}
        </div>
        {!this.slots() &&
            this.dataSource === undefined &&
            this.inDesigner() && (
              <div style="text-align: center; width:100%; position: absolute; top: 50%;">
                请绑定数据源或插入子节点
              </div>
            )}
        {this.genIndicator()}
      </div>
    );
  },
});

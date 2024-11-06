import _throttle from 'lodash/throttle';
import _isNil from 'lodash/isNil';

import { createNamespace } from '../utils';
import EmptyCol from '../emptycol';
import Loading from '../loading';

const [createComponent, bem] = createNamespace('linear-layout');

const GapEnums = ['shrink', 'none', 'mini', 'small', 'large', 'normal'];

export default createComponent({
  props: {
    type: {
      type: String,
      default: '',
    },
    loadingIcon: {
      type: String,
      default: 'loading',
    },
    loadingIconRotate: {
      type: Boolean,
      default: true,
    },
    loadingText: {
      type: String,
      default: '',
    },
    direction: {
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value),
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    gap: {
      type: [String, Number],
    },
  },
  data() {
    return {
      showLoading: false,
    };
  },
  components: {
    EmptyCol,
    Loading,
  },
  mounted() {
    this._handleScroll = _throttle(this.handleScroll.bind(this), 200);
    this.$refs.root.addEventListener(
      'scroll',
      this._handleScroll,
    );
  },
  beforeDestroy() {
    if (this._handleScroll && this.$refs.root) {
      this.$refs.root.removeEventListener('scroll', this._handleScroll);
    }
  },
  methods: {
    // expose
    openLoading() {
      this.showLoading = true;
    },
    // expose
    closeLoading() {
      this.showLoading = false;
    },
    handleScroll(e) {
      const el = e.target;
      const {
        scrollHeight,
        scrollWidth,
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
      } = el;
      this.$emit('scroll', {
        scrollHeight,
        scrollWidth,
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
      });
    },
    getGapAttrValue() {
      if (_isNil(this.gap)) {
        return undefined;
      }

      return GapEnums.includes(this.gap) ? this.gap : 'normal';
    },
    getSpaceBaseValue() {
      const val = this.$vnode.data.staticStyle && this.$vnode.data.staticStyle['--van-space-base'];

      if (val) {
        return val;
      }

      return this.$vnode.data.style && this.$vnode.data.style['--van-space-base'];
    },
    setGapStyle(children) {
      const elements = children.filter((child) => child.tag && child.data);

      elements.forEach((child, i) => {
        if (elements.length === (i + 1)) {
          return;
        }
        if (!child.data.staticStyle) {
          child.data.staticStyle = {};
        }

        const gapProp = this.direction === 'horizontal' ? 'margin-right' : 'margin-bottom';

        if (
          this.gap
          && (this.gap === 'normal' || !GapEnums.includes(this.gap))
          && !child.data.staticStyle[gapProp]
        ) {
          const spaceBaseValue = this.getSpaceBaseValue();
          if (this.gap === 'normal' && spaceBaseValue) {
            child.data.staticStyle[gapProp] = spaceBaseValue;
          } else {
            child.data.staticStyle[gapProp] = typeof this.gap === 'number' ? `${this.gap}px` : this.gap;
          }
        }
      });
    },
    renderSlot() {
      if (this.slots()) {
        const children = this.slots();
        this.setGapStyle(children);
        return children;
      }

      if (this.inDesigner()) {
        if (this.type === 'root') {
          return (
            <div key="empty" class={bem('emptyTip')}>
              拖拽右侧组件放至此处
            </div>
          );
        }

        return <EmptyCol></EmptyCol>;
      }
    },
    renderLoading() {
      if (!this.showLoading) {
        return null;
      }

      return (
        <div class={bem('mask')}>
          <Loading
            class={bem('loading')}
            vertical
            icon={this.loadingIcon}
            icon-rotate={this.loadingIconRotate}
          >
            {this.loadingText}
          </Loading>
        </div>
      );
    },
  },
  render() {
    return (
      <div
        ref="root"
        class={bem()}
        type={this.type}
        direction={this.direction}
        nowrap={!this.wrap}
        vusion-slot-name="default"
        gap={this.getGapAttrValue()}
        {...{
          on: { ...this.$listeners },
        }}
      >
        {this.renderSlot()}
        {this.renderLoading()}
      </div>
    );
  },
});

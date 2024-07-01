import _throttle from 'lodash/throttle';

import { createNamespace } from '../utils';
import EmptyCol from '../emptycol';
import Loading from '../loading';

const [createComponent, bem] = createNamespace('linear-layout');


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
    renderSlot() {
      if (this.slots()) {
        return this.slots();
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

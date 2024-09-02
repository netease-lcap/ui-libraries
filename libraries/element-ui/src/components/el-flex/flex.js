import styles from './flex.module.css';

export default {
  name: 'ElFlex',
  props: {
    mode: {
      type: String,
      default: () => 'flex',
    },
    direction: {
      type: String,
      default: () => 'horizontal',
    },
    justify: {
      type: String,
      default: () => 'start',
    },
    alignment: {
      type: String,
      default: () => 'start',
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    gutter: {
      type: Number,
      default: 12,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
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
  },
  data() {
    return {
      showLoading: this.loading,
    };
  },
  watch: {
    loading(val) {
      this.showLoading = val;
    },
  },
  methods: {
    startLoading() {
      this.showLoading = true;
    },
    closeLoading() {
      this.showLoading = false;
    },
  },
  render(h) {
    const style = this.mode === 'flex' ? {
      flexDirection: this.direction === 'horizontal' ? 'row' : 'column',
      justifyContent: this.justify,
      alignItems: this.alignment,
      flexWrap: this.wrap ? 'wrap' : 'nowrap',
      gap: `${this.gutter}px`,
    } : {
      // '--el-flex-space-base': `${this.gutter}px`,
    };

    return h('div', {
      style,
      class: this.mode === 'flex' ? styles.flex : styles.flexBlock,
      on: this.$listeners,
      attrs: {
        'vusion-slot-name': 'default',
        'element-loading-text': this.loadingText,
        'element-loading-spinner': 'el-icon-loading',
      },
    }, [
      this.$scopedSlots.default ? this.$scopedSlots.default() : null,
      this.showLoading ? h('div', {
        class: styles.loadmask,
      }, [
        h('div', {
          class: [styles.spinner, this.loadingIconRotate ? styles.rotating : ''],
        }, [
          this.loadingIcon ? h('el-icon', {
            attrs: { name: this.loadingIcon },
          }) : null,
          h('p', {}, this.loadingText),
        ]),
      ]) : null,
    ]);
  },
};

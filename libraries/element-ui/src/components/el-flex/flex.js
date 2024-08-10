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
      default: 0,
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
      '--el-flex-space-base': `${this.gutter}px`,
    };

    return h('div', {
      style,
      class: this.mode === 'flex' ? styles.flex : styles.flexBlock,
      on: this.$listeners,
      attrs: {
        'vusion-slot-name': 'default',
      },
    }, this.$scopedSlots.default ? this.$scopedSlots.default() : null);
  },
};

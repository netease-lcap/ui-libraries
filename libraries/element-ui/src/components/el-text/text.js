import styles from './text.module.css';

export default {
  name: 'ElText',
  props: {
    size: {
      type: String,
      default: 'default',
    },
    color: {
      type: String,
      default: 'default',
    },
    display: {
      type: String,
      default: 'inline',
    },
    overflow: {
      type: String,
      default: 'normal',
    },
  },
  render(h, ctx) {
    return h('span', {
      class: [
        styles.root,
        styles[`size-${this.size}`],
        styles[`color-${this.color}`],
        styles[`display-${this.display}`],
        styles[`overflow-${this.overflow}`],
      ],
      attrs: {
        'vusion-slot-name-edit': 'text',
      },
      on: this.$listeners,
    }, this.$slots.default);
  },
};

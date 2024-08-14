import styles from './index.module.css';

export default {
  name: 'ElAbsoluteLayout',
  render(h) {
    return h('div', {
      class: styles.root,
      on: this.$listeners,
    }, this.$scopedSlots.default ? this.$scopedSlots.default() : null);
  },
};

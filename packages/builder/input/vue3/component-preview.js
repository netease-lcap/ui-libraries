import { defineComponent, h } from 'vue';
import styles from './index.module.css';

export default defineComponent({
  props: ['demo', 'actived', 'title', 'name'],
  render() {
    return h(
      'div',
      {
        ...this.$attrs,
        id: this.name,
        selected: this.actived ? 'selected' : '',
        class: styles.sectionContainer,
      },
      [
        h('div', { class: styles.sectionTitle }, [this.title]),
        h('hr', { style: { margin: 0 } }),
        h('div', { class: styles.sectionBody }, [h(this.demo)]),
      ],
    );
  },
});

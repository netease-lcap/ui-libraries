import styles from './index.module.css';

export default {
  props: ['demo', 'actived', 'title', 'name'],
  render(h) {
    return h('div', {
      attrs: {
        id: this.name,
        selected: !!this.actived,
      },
      on: this.$listeners,
      class: styles.sectionContainer,
    }, [
      h('div', { class: styles.sectionTitle }, [this.title]),
      h('hr', { style: { margin: 0 } }),
      h('div', { class: styles.sectionBody }, [h(this.demo)]),
    ]);
  },
};

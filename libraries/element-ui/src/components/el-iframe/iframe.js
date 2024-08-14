import styles from './index.module.css';

export default {
  name: 'ElIframe',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    onLoad(event) {
      this.loaded = true;
      this.$emit('load', event);
    },
  },
  render(h) {
    return h(
      'div',
      {
        class: styles.root,
        on: this.$listeners,
      },
      [
        this.src
          ? h('iframe', {
            attrs: {
              ...this.attrs,
              src: this.src,
              frameborder: '0',
            },
            on: {
              load: this.onLoad,
            },
          })
          : null,
      ],
    );
  },
};

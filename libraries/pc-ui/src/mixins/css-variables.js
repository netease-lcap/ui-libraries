export default {
  data() {
    return {
      staticStyleVar: '',
    };
  },
  mounted() {
    this.staticStyleVar = this.getStaticStyleVar(this.$vnode.data.staticStyle);
  },
  updated() {
    const styleVarStr = this.getStaticStyleVar(this.$vnode.data.staticStyle);
    if (styleVarStr !== this.staticStyleVar) {
      this.staticStyleVar = styleVarStr;
    }
  },
  methods: {
    getStaticStyleVar(staticStyle) {
      if (!staticStyle || typeof staticStyle !== 'object') {
        return '';
      }

      const styles = [];

      Object.keys(staticStyle).forEach((key) => {
        if (/^--/.test(key)) {
          const value = staticStyle[key];
          styles.push(`${key}: ${value};`);
        }
      });

      return styles.join(' ');
    },
  },
};

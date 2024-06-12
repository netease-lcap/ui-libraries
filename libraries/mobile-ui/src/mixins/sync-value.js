export default {
  created() {
    this.$emit('sync:state', 'value', this.value);
    this.$on('update:value', (val, oldVal) => {
      if (val === oldVal) {
        return;
      }

      this.$emit('sync:state', 'value', val);
    });
  },
};

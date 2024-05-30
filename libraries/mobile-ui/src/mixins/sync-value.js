export default {
  created() {
    this.$emit('sync:value', this.value);
    this.$on('update:value', (val, oldVal) => {
      if (val === oldVal) {
        return;
      }

      this.$emit('sync:value', val);
    });
  },
};

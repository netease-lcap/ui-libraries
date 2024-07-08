export default {
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isPreview() {
      return this.preview || this.$parent?.preview || this.$parent?.$parent?.preview || this.$parent?.previewItem || this.$parent?.$parent?.previewItem || false;
    },
  },
};

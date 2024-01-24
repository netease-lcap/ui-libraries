<template>
  <section class="van-doc-demo-section" :class="demoName">
    <slot />
  </section>
</template>

<script>
function decamelize(str, sep = '-') {
  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
    .toLowerCase();
}
export default {
  name: 'demo-section',

  computed: {
    demoName() {
      const { meta } = this.$route || {};
      if (meta && meta.name) {
        return `demo-${decamelize(meta.name)}`;
      }

      return '';
    },
  },
};
</script>

<style lang="less">
.van-doc-demo-section {
  box-sizing: border-box;
  min-height: calc(100vh - 56px);
  padding-bottom: 20px;
}
</style>

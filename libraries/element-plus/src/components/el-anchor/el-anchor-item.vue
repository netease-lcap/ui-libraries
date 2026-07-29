<template>
  <div class="root" :id="label || refName" :name="label || refName">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'el-anchor-item',
  props: {
    name: { type: String, default: '' },
    label: { type: String, default: '' },
  },
  data() {
    return {
      refName: { type: String, default: '' },
    };
  },
  mounted() {
    if (this.$vnode) {
      this.refName = this.$vnode && this.$vnode.data && this.$vnode.data.ref;
    }
    const { hash } = location;
    const id = this.label || this.refName;
    console.log(id, hash,'nodehas');
    if (hash && id && hash === `#${id}`) {
      setTimeout(() => {
        const node = document.querySelector(hash);
        if (node) {
          node.scrollIntoView();
        }
      }, 100);
    }
  },
};
</script>

<style scoped>
/* .root {
  display: block;
  width: 100%;
  min-height: 50px;
} */
</style>

<template>
  <u-panel :class="{ 'no-title': !hasTitle }">
    <template #title v-if="title">
      <u-text :text="title" class="x-panel-card-header-title" />
    </template>
    <template #extra v-if="more">
      <IconMore class="x-panel-card-header-more" />
    </template>
    <slot />
  </u-panel>
</template>
<script>
import IconMore from './icon-more.vue';

export default {
  name: 'XPanel',
  components: {
    IconMore,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    more: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title;
    },
  },
};
</script>
<style scoped>
.x-panel-card-header-title {
  font-size: var(--font-size-large);
  color: var(--color-base);
  line-height: calc(var(--font-size-large) + 8px);
  font-weight: 500;
}

.x-panel-card-header-more {
  color: var(--font-second-color);
}
</style>
<style>
.no-title [class*="u-panel_head"] {
  display: none;
}
</style>

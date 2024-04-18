<template>
<a vusion-slot-name-edit="text" :class="[$style.root]"
    :href="currentHref" :target="target"
    :noDecoration="!decoration"
    :disabled="currentDisabled" :tabindex="currentDisabled ? -1 : 0"
    :download="currentDownload"
    :loading="loading || $attrs.loading"
    :hoverType="hoverType"
    @click="onClick" v-on="listeners">
    <i-ico v-if="icon" :name="icon" :class="$style.btnicon" notext></i-ico>
    <template v-if="!$slots.default">
      {{ text }}
    </template>
    <slot v-if="$slots.default"></slot>
</a>
</template>
<script>
import ULink from 'cloud-ui.vusion/src/components/u-link.vue/index.vue';
import IIco from 'cloud-ui.vusion/src/components/i-ico.vue/index.vue';

export default {
    name: 'van-link',
    components: {
      IIco
    },
    extends: ULink
};
</script>

<style module>
.root {
  color: var(--link-color);
}

.root:hover {
  text-decoration: underline;
}

.root[hoverType="color"]:hover {
  text-decoration: none;
  color: var(--link-color-hover);
}

.root[noDecoration] {
  text-decoration: none !important;
}

.root:focus {
  /* Remove default focus style */
  outline: var(--focus-outline);
  text-decoration: underline;
}

.root[color="success"] {
  color: var(--link-color-success);
}

.root[hoverType="color"][color="success"]:hover {
  color: var(--link-color-success-hover);
}

.root[color="warning"] {
  color: var(--link-color-warning);
}

.root[hoverType="color"][color="warning"]:hover {
  color: var(--link-color-warning-hover);
}

.root[color="error"] {
  color: var(--link-color-error);
}

.root[hoverType="color"][color="error"]:hover {
  color: var(--link-color-error-hover);
}

.root[color="danger"] {
  color: var(--link-color-danger);
}

.root[hoverType="color"][color="danger"]:hover {
  color: var(--link-color-danger-hover);
}

.root[color="light"] {
  color: var(--link-color-light);
}

.root[color="white"] {
  color: var(--link-color-white);
}

.root[disabled] {
  cursor: var(--cursor-not-allowed);
  color: var(--link-color-disabled);
  text-decoration: none;
}

.root[hoverType=color][disabled]:hover {
  color: var(--link-color-disabled);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.root[loading]::before {
  display: inline-block;
  content: "\e66b";
  font-family: "lcap-ui-icons";
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-decoration: inherit;
  text-rendering: optimizeLegibility;
  text-transform: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  margin-right: 4px;
  animation: spin infinite linear var(--spinner-animation-duration);
}

.root[display="block"] {
  display: block;
}

.root:lang(en) {
  display: inline-block;
  max-width: 100%;
}
</style>


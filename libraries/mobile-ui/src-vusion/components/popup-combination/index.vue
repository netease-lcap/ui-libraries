<template>
  <span :class="$env.VUE_APP_DESIGNER ? [$style.root, $style.rootDesigner] : $style.root" :display="display" :ellipsis="ellipsis"
    :vusion-click-enabled="$env.VUE_APP_DESIGNER">
    <span vusion-slot-name="reference" :class="$style.reference">
        <slot name="reference"></slot>
        <s-empty v-if="$env.VUE_APP_DESIGNER && !$slots.reference && !!$attrs['vusion-node-path']"></s-empty>
    </span>
    <u-popup
      ref="popup"
      :style="staticStyle"
      reference="prev"
      v-bind="$attrs"
      v-on="$listeners"
      @before-open="beforeOpen"
      :vusion-scope-id="$vnode.context.$options._scopeId">
        <slot></slot>
    </u-popup>
  </span>
</template>

<script>
import UPopupCombination from 'cloud-ui.vusion/src/components/u-popup-combination.vue/index.vue';
import { context } from '../../../src/mixins/popup/context';

export default {
  name: 'van-popup-combination',
  extends: UPopupCombination,
  data() {
    return {
      staticStyle: '',
    }
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    getStaticStyle(staticStyle) {
      let style = '';
      for (const key in staticStyle) {
        if (Object.prototype.hasOwnProperty.call(staticStyle, key)) {
          if (/^--/.test(key)) {
            const value = staticStyle[key];
            style += `${key}: ${value};`
          }

        }
      }

      // 为了避免被遮挡，z-index 需要比 popup 高
      style += `z-index: ${context.zIndex + 2};`

      return style;
    },
    beforeOpen() {
      this.staticStyle = this.getStaticStyle(this.$vnode.data.staticStyle)
    },
  }
};
</script>

<style module>
.root {
  display: inline-block;
  vertical-align: middle;
}

.root[display="block"] {
  display: block;
}

.root[ellipsis] {
  width: 100%;
}

.root[ellipsis] .reference {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.root[ellipsis] .reference>* {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rootDesigner {
  padding: 2px;
  border: 1px dashed #C3C3C3;
  /* min-height: 100px; */
}

.reference {
  display: inline-block;
}</style>

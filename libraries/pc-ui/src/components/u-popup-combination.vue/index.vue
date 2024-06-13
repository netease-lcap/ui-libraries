<template>
    <span :class="$env.VUE_APP_DESIGNER? [$style.root, $style.rootDesigner]:$style.root" :display="display" :ellipsis="ellipsis"
        :vusion-click-enabled="$env.VUE_APP_DESIGNER">
        <span vusion-slot-name="reference" :class="$style.reference">
            <slot name="reference"></slot>
            <s-empty v-if="$env.VUE_APP_DESIGNER && !$slots.reference && !!$attrs['vusion-node-path']"></s-empty>
        </span>
        <u-popup
          reference="prev"
          v-bind="$attrs"
          v-on="$listeners"
          ref="popup"
          :style="staticStyleVar"
          :vusion-scope-id="$vnode.context.$options._scopeId"
        >
            <slot></slot>
        </u-popup>
    </span>
</template>

<script>
import UPopup from '../u-popup.vue/index.vue';
import SEmpty from '../../components/s-empty.vue';
export default {
    name: 'u-popup-combination',
    components: { SEmpty, UPopup },
    props: {
        display: String,
        ellipsis: Boolean,
    },
    data() {
      return {
        staticStyleVar: '',
      }
    },
    mounted() {
      this.staticStyleVar = this.getStaticStyleVar(this.$vnode.data.staticStyle);
    },
    updated() {
      this.staticStyleVar = this.getStaticStyleVar(this.$vnode.data.staticStyle);
    },
    methods: {
        // 双击打开弹出框
        // designerDbControl() {
        //     this.$refs.popup.designerDbControl();
        // },
        // 单击打开弹出框
        designerControl() {
            this.$refs.popup.toggle();
        },
        open() {
            this.$refs.popup.open();
        },
        close() {
            this.$refs.popup.close();
        },
        toggle(opened) {
            this.$refs.popup.toggle(opened);
        },
        update() {
            this.$refs.popup.update();
        },
        scheduleUpdate() {
            this.$refs.popup.scheduleUpdate();
        },
        getStaticStyleVar(staticStyle) {
          let style = '';
          for (const key in staticStyle) {
            if (Object.prototype.hasOwnProperty.call(staticStyle, key)) {
              if (/^--/.test(key)) {
                const value = staticStyle[key];
                style += `${key}: ${value};`
              }
            }
          }
          return style;
        },
    },
};
</script>

<style module>
.root{
    display: inline-block;
    vertical-align: middle;
}
.root[display="block"]{
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
.root[ellipsis] .reference > * {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.rootDesigner{
    padding: 2px;
    border: 1px dashed #C3C3C3;
    /* min-height: 100px; */
}
.reference{
    display: inline-block;
}
</style>


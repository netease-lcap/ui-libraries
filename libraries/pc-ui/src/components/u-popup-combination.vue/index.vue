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
import CssVarsStyleMixin from '../../mixins/css-variables';
import UPopup from '../u-popup.vue/index.vue';
import SEmpty from '../../components/s-empty.vue';
export default {
    name: 'u-popup-combination',
    components: { SEmpty, UPopup },
    mixins: [
      CssVarsStyleMixin,
    ],
    props: {
        display: String,
        ellipsis: Boolean,
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


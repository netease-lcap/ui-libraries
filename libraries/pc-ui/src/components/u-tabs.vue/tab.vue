<template>
<div :class="$style.root" v-if="!tabLoadOnActive || selected" v-show="selected" vusion-slot-name="default" :vusion-disabled-selected="true">
    <slot></slot>
    <s-empty v-if="!$slots.default && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import { MSinglexItem } from '../m-singlex.vue';
import SEmpty from '../s-empty.vue';

export default {
    name: 'u-tab',
    parentName: 'u-tabs',
    components: { SEmpty },
    extends: MSinglexItem,
    mixins: [
      sync({
        disabled: 'disabled',
      })
    ],
    inject: ['tabLoadOnActive'],
    props: {
        title: String,
        /* @TODO: Remove this option */
        hidden: {
            type: Boolean,
            default: false,
        },
        loadOnActive: { type: Boolean, default: false },
        closable: { type: Boolean, default: false },
        showTabItem: { type: Boolean, default: true },
    },
    computed: {
        selected() {
            // console.log('tab', this.parentVM, this.active);
            return this.parentVM && (this.parentVM.router ? this.active : this.parentVM.selectedVM === this);
        },
    },
    updated() {
        // IDE里组件放入title插槽后没有重新渲染，这里强制渲染
        if (this.$env.VUE_APP_DESIGNER) {
            if (this.parentVM) {
                this.parentVM.$forceUpdate();
            }
        }
    },
    methods: {
        designerControl() {
            this.parentVM.select(this);
        },
    },
};
</script>

<style module>
.root {
    height: 100%;
}
</style>

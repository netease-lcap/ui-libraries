<template>
<div v-show="selected" vusion-slot-name="default">
    <slot></slot>
    <s-empty v-if="!$slots.default && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import { UTab } from '../u-tabs.vue';
import SEmpty from '../s-empty.vue';

export default {
    name: 'u-step',
    parentName: 'u-steps',
    components: { SEmpty },
    extends: UTab,
    mixins: [
      sync({
        readonly: 'readonly',
        status: 'status',
      })
    ],
    props: {
        value: { type: Number, default: 0 },
        desc: { type: String, default: null },
        icon: { type: String, default: null },
        readonly: { type: Boolean, default: false },
        status: String,
    },
    computed: {
        index() {
            return this.parentVM && this.parentVM.itemVMs.indexOf(this);
        },
    },
};
</script>

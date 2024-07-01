<template>
<ul :class="$style.root" :pending="pending">
    <template v-for="(item, index) in currentDataSource.data">
        <slot name="item" :item="item" :designer="$env.VUE_APP_DESIGNER" :index="index"></slot>
    </template>
    <template v-if="$env.VUE_APP_DESIGNER && !dataSource && !$slots.default">
        <slot name="item" :item="item" :designer="$env.VUE_APP_DESIGNER" :index="index" v-for="(item, index) in [{},{},{}]"></slot>
    </template>
    <slot></slot>
</ul>
</template>
<script>
import { sync } from '@lcap/vue2-utils';
import SupportDataSource from '../../mixins/support.datasource.js';
import UTimelineItem from './item.vue';
export default {
    name: 'u-timeline',
    mixins: [
      SupportDataSource,
      sync({
        data() {
          return this.currentDataSource && Array.isArray(this.currentDataSource.data)
            ? this.currentDataSource.data : [];
        },
      }),
    ],
    components: {
        UTimelineItem,
    },
    props: {
        pending: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: String,
            default: 'default',
            validator(value) {
                return ['default', 'alternate', 'label'].indexOf(value) !== -1;
            },
        },
    },
    provide() {
        return {
            timeline: this,
        };
    },
    data() {
        return {
            multiple: true,
        };
    },
};
</script>
<style module src="./module.css">
</style>

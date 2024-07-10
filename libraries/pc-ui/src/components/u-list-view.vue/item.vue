<template>
<div :class="$style.root"
    :style="getStyle()"
    :selected="parentVM.multiple ? currentSelected : isSelected"
    :readonly="parentVM.readonly" :readonly-mode="parentVM.readonlyMode"
    :disabled="disabled || parentVM.disabled"
    :checkbox="parentVM.multiple && parentVM.checkbox"
    @click="select"
    v-ellipsis-title="ellipsisTitle"
    :designer="$env.VUE_APP_DESIGNER"
    vusion-slot-name="item">
    <u-checkbox v-if="parentVM.multiple && parentVM.checkbox"
        :readonly="parentVM.readonly"
        :disabled="disabled || parentVM.disabled"
        :value="currentSelected"
    ></u-checkbox>
    <slot>{{ text }}</slot>
</div>
</template>

<script>
import { MComplexItem } from '../m-complex.vue';
import { isFunction } from 'lodash';

export default {
    name: 'u-list-view-item',
    parentName: 'u-list-view',
    groupName: 'u-list-view-group',
    extends: MComplexItem,
    props: {
        text: { type: String },
        ellipsisTitle: { type: [Boolean, String], default: false },
        setRowStyle: { type: Function },
        item: { tyepe: Object },
        index: { type: Number },
        value: { type: String }
    },
    methods: {
        getStyle() {
            return isFunction(this.setRowStyle) ? this.setRowStyle({ item: this.item, index: this.index, value: this.value }) : {};
        }
    }
};
</script>

<style module src="./item.css"></style>

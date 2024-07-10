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
        disabled: { type: Boolean },
    },
    methods: {
        getStyle() {
            // TODO LD:打开表达式编辑后，为什么current里没有这些传进去的参数
            return isFunction(this.setRowStyle) ? this.setRowStyle({ item: { ...this.item, disabled: this.disabled }, index: this.index }) : {};
        }
    }
};
</script>

<style module src="./item.css"></style>

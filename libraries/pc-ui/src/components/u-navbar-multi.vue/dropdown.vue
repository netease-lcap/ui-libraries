<template>
<div :class="$style.root" :disabled="disabled">
    <div :class="$style.title"><slot name="title">{{ title }}</slot></div>
    <m-popper :class="$style.popper" :trigger="trigger" :placement="placement" :disabled="disabled" append-to="reference"
        :opened="opened" @update:opened="$emit('update:opened', $event)">
        <slot></slot>
    </m-popper>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
export default {
    name: 'u-navbar-dropdown-multi',
    parentName: 'u-navbar-multi',
    mixins: [
      sync('disabled'),
    ],
    props: {
        title: String,
        trigger: { type: String, default: 'hover' },
        placement: {
            type: String,
            default: 'bottom-start',
            validator: (value) =>
                /^(top|bottom|left|right)(-start|-end)?$/.test(value),
        },
        opened: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
};
</script>

<style module>
.root {
    display: inline-block;
    position: relative;
    z-index: 1;
    cursor: var(--cursor-pointer);
    height: var(--navbar-height);
    line-height: var(--navbar-height);
    border: none;
    padding: var(--navbar-dropdown-padding);
    font-size: var(--navbar-item-font-size);
    color: var(--navbar-color);
}

.root:not(:last-child) {
    margin-right: var(--navbar-item-space);
}

.root::after {
    position: absolute;
content: "\e65d";
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
    height: auto;
    line-height: var(--navbar-height);
    color: var(--navbar-color);
    font-size: 20px;
    right: 6px;
    top: 0;
}

.popper {
    background: var(--navbar-dropdown-popper-background);
    font-size: var(--navbar-dropdown-popper-font-size);
    width: 100%;
    line-height: var(--navbar-dropdown-popper-line-height);
    /* padding-top: 3px; */
    padding: var(--navbar-dropdown-popper-padding);
}

.root[disabled] {
    cursor: var(--cursor-not-allowed);
    color: var(--navbar-dropdown-color-disabled);
}
</style>

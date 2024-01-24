<template>
<span :class="$style.root" :type="type">
    <u-tooltip
            :content="content"
            :opened="opened"
            :trigger="trigger"
            :placement="placement"
            :reference="reference"
            :hide-delay="hideDelay"
            :boundaries-element="boundariesElement"
            :follow-cursor="followCursor"
            :offset="offset"
            :disabled="disabled"
            :size="size"
            v-on="$listeners">
        <slot></slot>
    </u-tooltip>
</span>
</template>

<script>
import MPopper from '../m-popper.vue';
import pick from 'lodash/pick';

/**
 * 默认显示一个按钮，hover 上去有提示
 */

export default {
    name: 'u-icon-tooltip',
    props: {
        type: { type: String, default: 'info' }, // 按钮名称
        size: { type: String, default: 'normal' }, // 提示大小
        content: String,
        trigger: { type: String, default: 'hover' },
        placement: { type: String, default: 'bottom' },
        ...pick(MPopper.props, [
            'opened',
            'reference',
            'hideDelay',
            'boundariesElement',
            'followCursor',
            'offset',
            'disabled',
        ]),
    },
};
</script>

<style module>
.root {
    display: inline-block;
    line-height: 1;
    color: var(--icon-tooltip-color);
}

.root:hover {
    color: var(--brand-primary);
}

.root::before {
content: "\e67a";
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
}

.root[type="help"]::before {
content: "\e652";
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
}

.root[type="detail"]::before {
content: "\e65b";
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
}
</style>

<template>
    <div :class="$style.root">
        <div :class="$style.body">
            <u-loading v-if="loading" size="small"></u-loading>
            <span :class="$style.loadContent">{{ treeSelectTip }}</span>
            <slot></slot>
        </div>
        <div :class="$style.button" role="prev"></div>
        <div :class="$style.button" role="next"></div>
    </div>
</template>

<script>
import SupportDataSource from '../../mixins/support.datasource.js';
import ULoading from '../u-loading.vue'

export default {
    name: 'u-carousel-designer',
    mixins: [
        SupportDataSource,
    ],
    components: {
        ULoading,
    },
};
</script>

<style module>
.root {
    position: relative;
    z-index: 1;
    overflow: hidden;
    width: var(--carousel-width);
    height: var(--carousel-height);
    min-width: 350px;
}

.body {
    width: 100%;
    height: 100%;
}


.button {
    position: absolute;
    z-index: 100;
    font-size: var(--carousel-button-font-size);
    font-weight: var(--font-weight-bold);
    color: var(--carousel-button-color);
    transition: var(--carousel-button-transition);
    top: 50%;
    transform: translateY(calc(-50%));
    display: none;
}

.root:hover .button {
    display: block;
}

.button:hover {
    color: var(--carousel-button-color-hover);
    background: var(--carousel-button-background-hover);
}

.button[role='prev'],
.button[role='next'] {
    width: calc(var(--carousel-button-font-size)*2);
    height: calc(var(--carousel-button-font-size)*2);
    border-radius: var(--carousel-button-font-size);
    background: var(--carousel-button-background);
}

.button[role='prev'] {
    left: var(--carousel-button-space);
}

.button[role='prev']::before {
    content: "\e675";
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
    position: absolute;
    height: var(--carousel-button-font-size);
    top: 36%;
    left: 48%;
    transform: translate(-50%, -50%);
}

.button[role='next'] {
    right: var(--carousel-button-space);
}

.button[role='next']::before {
    content: "\e664";
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
    position: absolute;
    height: var(--carousel-button-font-size);
    top: 36%;
    left: 52%;
    transform: translate(-50%, -50%);
}

.root .loadContent {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
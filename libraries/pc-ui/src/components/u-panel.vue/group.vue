<template>
<div :class="$style.root">
    <div :class="$style.head" v-if="title || $slots.title || $env.VUE_APP_DESIGNER" vusion-slot-name-edit="title" vusion-slot-name="title">
        <slot name="title">
            {{ title }}
            <s-empty
                v-if="!$slots.title
                    && !title
                    && $env.VUE_APP_DESIGNER
                    && !!$attrs['vusion-node-path']">
            </s-empty>
        </slot>
    </div>
    <div :class="$style.body" vusion-slot-name="default">
        <slot></slot>
        <s-empty v-if="(!$slots.default) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty>
    </div>
</div>
</template>

<script>
import SEmpty from '../s-empty.vue';

export default {
    name: 'u-panel-group',
    components: {
        SEmpty,
    },
    props: { title: String },
};
</script>

<style module>
.root {

}

.root:not(:last-child) {
    margin-bottom: var(--space-base);
}

.head {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
    /* border-top: 1px solid $border-color-light;
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px; */
    color: var(--color-light);
}

.body {
    padding-bottom: 5px;
}
</style>

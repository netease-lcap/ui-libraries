<template>
<li :class="{ [$style.root]: true, [$style.left]: itemPosition === 'left', [$style.right]: itemPosition === 'right' }" :color="color" :designer="$env.VUE_APP_DESIGNER" ref="wrap">
    <div :class="$style.label" v-if="itemPosition !== undefined" vusion-slot-name="label" ref="labelwrap">
        <slot name="label" v-if="$slots.label"></slot>
        {{ !$slots.label ? label : undefined }}
        <s-empty v-if="(!$slots.label && !label) && $env.VUE_APP_DESIGNER && ($attrs['vusion-node-path'] || $attrs.designer)" :class="$style.empty"></s-empty>
    </div>
    <div :class="$style.tail" uname="tail"></div>
    <div v-if="!$slots.dot" :class="$style.dot" :style="{ borderColor: /primary|success|warning|error/.test(color) ? undefined : color }"></div>
    <div v-else :class="$style.dotCustom">
        <slot name="dot"></slot>
    </div>
    <div :class="$style.content" uname="content" vusion-slot-name="default" ref="contentwrap">
        <slot></slot>
        <s-empty v-if="(!$slots.default && !($scopedSlots.item)) && $env.VUE_APP_DESIGNER" :class="$style.empty"></s-empty>
        <span vusion-slot-name="item">
            <slot name="item" :item="item" :index="index"></slot>
            <s-empty v-if="(($scopedSlots.item && !$scopedSlots.item())) && $env.VUE_APP_DESIGNER && ($attrs['vusion-node-path'] || $attrs.designer)" :class="$style.empty"></s-empty>
        </span>
    </div>
</li>
</template>
<script>
import SEmpty from '../s-empty.vue';

export default {
    name: 'u-timeline-item',
    props: {
        color: {
            type: String,
            default: 'blue',
        },
        label: {
            type: String,
        },
        position: {
            validator(value) {
                return ['left', 'right'].indexOf(value) !== -1;
            },
            default: 'right',
        },
        item: {
            type: [Object, String, Number],
        },
        index: {
            type: [Object, String, Number],
        },
    },
    components: {
        SEmpty,
    },
    inject: ['timeline'],
    data() {
        return {
            observerwh: null,
        };
    },
    computed: {
        hastop() {
            return this.$env.VUE_APP_DESIGNER;
        },
        itemPosition() {
            return ['alternate', 'label'].indexOf(this.timeline.mode) !== -1 ? this.position : undefined;
        },
    },
    mounted() {
        this.observeLabel();
    },
    updated() {
        this.observeLabel();
    },
    destroyed() {
        this.observerwh && this.observerwh.disconnect();
    },
    methods: {
        observeLabel() {
            if (!this.$refs.labelwrap) return;
            this.observerwh = new MutationObserver(this.pwh);
            this.observerwh.observe(this.$refs.labelwrap, {
                attributes: true, childList: true, subtree: true,
            });
            setTimeout(() => {
                this.pwh();
            });
        },
        pwh() {
            let realH;
            const realHeight = this.$refs.labelwrap.scrollHeight;
            const realHeightr = this.$refs.contentwrap.scrollHeight;
            // eslint-disable-next-line prefer-const
            realH = Math.max(realHeight, realHeightr);
            if (this.timeline.mode === 'label' && realH && realH > 0) {
                // const originHeight = this.$refs.wrap.offsetHeight;
                (this.$refs.wrap.style.height = realH + 20 + 'px');
            }
        },
    },
};
</script>
<style module>
.root {
    position: relative;
    list-style: none;
    margin: 0;
    padding-bottom: var(--timeline-item-padding-bottom);
}

.tail {
    position: absolute;
    left: 4px;
    top: 10px;
    height: calc(100% - 10px);
    border-left: var(--timeline-tail-width) solid var(--timeline-tail-color);
}

.dot {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--timeline-dot-background-color);
    border: 2px solid var(--border-color-base);
    border-radius: 100px;
}

.root[color="primary"] .dot {
    color: var(--brand-primary);
    border-color: var(--brand-primary);
}

.root[color="success"] .dot, .root[color="done"] .dot {
    color: var(--brand-success);
    border-color: var(--brand-success);
}

.root[color="warning"] .dot, .root[color="doing"] .dot {
    color: var(--brand-warning);
    border-color: var(--brand-warning);
}

.root[color="error"] .dot {
    color: var(--brand-error);
    border-color: var(--brand-error);
}

.dotCustom {
    position: absolute;
    top: 5.5px;
    left: 5px;
    width: auto;
    height: auto;
    margin-top: 0;
    padding: 3px 1px;
    line-height: 1;
    text-align: center;
    border: 0;
    border-radius: 0;
    transform: translate(-50%, -50%);
}

.content {
    position: relative;
    top: calc(var(--font-size-base) - var(--font-size-base) * var(--line-height-base) + 1px);
    margin: 0 0 0 18px;
    word-break: break-word;
}
[designer] .content {
    top: 0;
}
[designer] .dot {
    margin-top: 6px;
}

[designer] .tail {
    top: 16px;
}

.left .tail, .left .dot,
.left .dotCustom,
.right .tail, .right .dot,
.right .dotCustom {
    left: 50%;
}

.left .dot, .right .dot {
    margin-left: -4px;
}

.right .dotCustom {
    margin-left: 1px;
}

.left .content {
    width: calc(50% - 12px);
    margin: 0;
    text-align: right;
}

.right .content {
    left: calc(50% - 4px);
    width: calc(50% - 14px);
    text-align: left;
}

.left .label {
    position: absolute;
    top: calc(var(--font-size-base) - var(--font-size-base) * var(--line-height-base) + 1px);
    left: calc(50% + 14px);
    width: calc(50% - 14px);
    text-align: left;
}

.right .label {
    position: absolute;
    top: calc(var(--font-size-base) - var(--font-size-base) * var(--line-height-base) + 1px);
    width: calc(50% - 12px);
    text-align: right;
}
[designer] .label {
    top: 0;
}
.root[designer][insource] + .root[designer][insource] {
    pointer-events: none;
}
.root[designer][insource] + .root[designer][insource]::after {
    content: '';
    position: absolute;
    display: block;
    background: rgba(255, 255, 255, 0.8);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>

<template>
<div :class="$style.root">
    <a
        :class="$style.link"
        :selected="selected"
        :readonly="parentVM.readonly"
        :disabled="disabled || parentVM.disabled"
        :href="!disabled && anchorJumped"
        :target="target"
        v-on="listeners"
        v-ellipsis-title
        :value="value"
        @click.stop="handleClick($event)"
    >
        <span vusion-slot-name="label">
            <s-empty v-if="(!$slots.label) && $env.VUE_APP_DESIGNER "></s-empty>
            <slot name="label">{{ label }}</slot>
        </span>
    </a>
    <div :class="$style.sub">
        <slot></slot>
    </div>
</div>
</template>

<script>
import { MSinglexItem } from '../m-singlex.vue';
import SEmpty from '../s-empty.vue';

export const UTocItem = {
    name: 'u-toc-item',
    parentName: 'u-toc',
    extends: MSinglexItem,
    components: {
        SEmpty,
    },
    props: {
        value: null,
        label: { type: String, default: '' },
        anchorLinked: { type: String, default: '' },
        hrefAndTo: { type: String, default: '' },
        target: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
    },
    computed: {
        listeners() {
            const listeners = Object.assign({}, this.$listeners);
            delete listeners.click;
            return listeners;
        },
        selected() {
            if (this.isSelected && !this.active) {
                return this.isSelected;
            } else if (!this.isSelected && this.active) {
                return false;
            }
            return this.parentVM && this.parentVM.router ? this.active : this.isSelected;
        },
        anchorJumped() {
            if (this.anchorLinked) {
                return `${this.hrefAndTo}#${this.anchorLinked}`;
            } else if (this.hrefAndTo) {
                return this.hrefAndTo;
            }
            return this.currentHref;
        },
    },
    watch: {
        active(active) {
            this.watchActive(active);
        },
    },
    mounted() {
        this.watchActive(this.active);
    },
    methods: {
        watchActive(active) {
            // active && this.groupVM && this.groupVM.toggle(true);
            if (active && this.parentVM) {
                this.parentVM.setActive(this);
                this.parentVM.stopScrollSpy(this);
            }
        },
        async handleClick(e) {
            if (this.disabled || this.readonly || this.parentVM.disabled || this.parentVM.readonly)
                return;
            this.parentVM.select(this);
            const actualValue = this.value || this.label;
            const oldValue = this.value;
            const oldVM = this.selectedVM;
            this.$emit('click', {
                value: actualValue,
                node: this.node,
                oldNode: oldVM && oldVM.node,
                nodeVM: this,
                oldVM,
            }, this);
            if (this.link) {
                const res = await this.$linkpao(this.link, this.target);
                if (res) {
                    e.preventDefault();
                }
            }
        },
    },
};

export default UTocItem;
</script>

<style module>
.root {
    position: relative;
    display: block;
    cursor: var(--cursor-pointer);
}

.root::before {
    content: '';
    display: block;
    position: absolute;
    width: var(--toc-item-circle-size);
    height: var(--toc-item-circle-size);
    left: -13px;
    top: 9px;
    border-radius: 100px;
    background: var(--toc-border-color);
}

.root .root::before {
    display: none;
}

.link {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.link:hover {
    color: var(--brand-primary);
}

.link[readonly] {
    cursor: default;
    background: none;
}

.link[selected] {
    color: var(--brand-primary);
}

.link[disabled] {
    /* @Private */
    cursor: var(--cursor-not-allowed);
    background: none;
    color: var(--color-light);
}

.link[selected][disabled] {
    background: var(--gray-lighter);
}

.sub {
    padding-left: 1em;
}
</style>

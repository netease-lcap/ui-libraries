<template>
<div :class="$style.root">
    <div :class="$style.text">{{ text }}</div>
    <div :class="$style.sub">
        <slot></slot>
    </div>
</div>
</template>

<script>
import MEmitter from '../m-emitter.vue';

export default {
    name: 'm-node',
    rootName: 'm-root',
    mixins: [MEmitter],
    props: { text: String },
    data() {
        return { nodeVMs: [], rootVM: undefined, parentVM: undefined };
    },
    created() {
        this.$contact(
          (vm) => (
            vm.$options.name === this.$options.name
            || vm.$options.name === this.$options.rootName
          ),
          (vm) => {
            // console.log('contact', vm.$options.name);
            if (vm.$options.name === this.$options.rootName) {
              this.rootVM = vm;
              vm.nodeVMs.push(this);
            } else {
              this.parentVM = vm;
              this.rootVM = vm.rootVM;
              vm.nodeVMs.push(this);
            }
          }
        );
    },
    destroyed() {
        this.$contact(this.$options.rootName, (rootVM) => {
            const index = rootVM.nodeVMs.indexOf(this);
            ~index && rootVM.nodeVMs.splice(index, 1);
            this.rootVM = undefined;
        });
        this.$contact(this.$options.name, (parentVM) => {
            const index = parentVM.nodeVMs.indexOf(this);
            ~index && parentVM.nodeVMs.splice(index, 1);
            this.rootVM = undefined;
            this.parentVM = undefined;
        });
    },
};
</script>

<style module>
.root {
    margin-left: 20px;
}

.text {
    position: relative;
    padding: 4px 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

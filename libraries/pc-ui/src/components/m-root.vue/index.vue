<template>
<div :class="$style.root">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'm-root',
    nodeName: 'm-node',
    data() {
        return { nodeVMs: [] };
    },
    methods: {
        walk(func) {
            let queue = [];
            queue = queue.concat(this.nodeVMs);
            let nodeVM;
            while ((nodeVM = queue.shift())) {
                queue = queue.concat(nodeVM.nodeVMs);
                const result = func(nodeVM);
                if (result !== undefined)
                    return result;
            }
        },
        /* 便利node 从children开始 */
        walkNodes(nodes, func) {
          nodes.forEach((nodeVM) => {
            if (Array.isArray(nodeVM.nodeVMs) && nodeVM.nodeVMs.length > 0) {
              this.walkNodes(nodeVM.nodeVMs, func);
            }

            func(nodeVM);
          });
        },
        find(func) {
            return this.walk((nodeVM) => {
                if (func(nodeVM))
                    return nodeVM;
            });
        },
    },
};
</script>

<style module>
.root {}
</style>

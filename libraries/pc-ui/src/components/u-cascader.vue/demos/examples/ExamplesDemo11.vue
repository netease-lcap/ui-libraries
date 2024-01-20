<!-- 动态加载 -->
<template>
<u-linear-layout >
    <u-cascader lazy :lazyLoad="lazyLoad" >
    </u-cascader>
</u-linear-layout>
</template>
<script>
let id = 0;
export default {
    data(){
        return {
            lazyLoad (node, resolve) {
                const { level } = node;
                setTimeout(() => {
                const nodes = Array.from({ length: level + 1 })
                    .map(() => ({
                    value: ++id,
                    text: `选项${id}`,
                    leaf: level >= 2
                    }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
                }, 1500);
            }
        }
    },
};
</script>
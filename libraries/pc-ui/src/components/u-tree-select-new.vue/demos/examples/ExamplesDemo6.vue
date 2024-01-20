<!-- 支持多选 -->
<template>
    <u-tree-select-new  v-model="value" checkable clearable valueField="text1" textField="text1" :data-source="dataSource"></u-tree-select-new>
</template>
<script>
    export default {
        data() {
            return {
                value: [],
                dataSource: [
                    { text1: '节点 1', value1: '1', children: [
                        { text1: '节点 1.1' , value1: '1.1'},
                        { text1: '节点 1.2', value1: '1.2' ,children: [
                            { text1: '节点 1.2.1', value1: '1.2.1' },
                            { text1: '节点 1.2.2' , value1: '1.2.2' },
                        ] },
                        { text1: '节点 1.3', value1: '1.3' },
                        { text1: '节点 1.4' , value1: '1.4'},
                    ] },
                    { text1: '节点 2' ,value1: '2'},
                    { text1: '节点 3', value1: '3', children: [
                        { text1: '节点 3.1', value1: '3.1' },
                        { text1: '节点 3.2' , value1: '3.2'},
                    ] },
                ],
            };
        },
        methods: {
            
        },
    }
</script>
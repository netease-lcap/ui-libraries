<template>
<u-tree-select-new :data-source="list" text-field="text" value-field="value" clearable :value.sync="value"></u-tree-select-new>
</template>
<script>
export default {
    data() {
        return {
            value: '1-3-1-1',
            list: [
                {
                    text: '一级分类',
                    value: '1',
                    children: [
                        {
                            text: '二级分类选项文字极限很长...',
                            value: '1-1',
                            children: [
                                {
                                    text: '三级分类',
                                    value: '1-1-1',
                                },
                            ],
                        },
                        {
                            text: '二级分类',
                            value: '1-2',
                            children: [
                                {
                                    text: '三级分类',
                                    value: '1-2-1',
                                },
                            ],
                        },
                        {
                            text: '二级分类',
                            value: '1-3',
                            children: [
                                {
                                    text: '三级分类',
                                    value: '1-3-1',
                                    children: [
                                        {
                                            text: '四级分类',
                                            value: '1-3-1-1',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    text: '一级分类',
                    value: '2',
                    children: [
                        {
                            text: '二级分类',
                            value: '2-1',
                        },
                        {
                            text: '二级分类',
                            value: '2-2',
                        },
                    ],
                },
            ],
        };
    },
};
</script>

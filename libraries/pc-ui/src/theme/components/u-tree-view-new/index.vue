<template>
<u-tree-view :value.sync="value" :data="list"></u-tree-view>
</template>
<script>
export default {
    data() {
        return {
            value: undefined,
            list: [
                {
                    text: '一级分类',
                    children: [
                        {
                            text: '二级分类选项文字极限很长...',
                            children: [
                                {
                                    text: '三级分类',
                                },
                            ],
                        },
                        {
                            text: '二级分类',
                            children: [
                                {
                                    text: '三级分类',
                                },
                            ],
                        },
                        {
                            text: '二级分类',
                            children: [
                                {
                                    text: '三级分类',
                                    value: '3',
                                    children: [
                                        {
                                            text: '四级分类',
                                            value: '4',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    text: '一级分类',
                    children: [
                        {
                            text: '二级分类',
                        },
                        {
                            text: '二级分类',
                        },
                    ],
                },
            ],
        };
    },
    mounted() {
        setTimeout(() => {
            this.value = '4';
        }, 100);
    },
};
</script>

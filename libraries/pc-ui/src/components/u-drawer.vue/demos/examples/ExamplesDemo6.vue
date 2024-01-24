<!-- blocks效果测试 -->
<template>
    <div>
        <u-drawer :visible.sync="leftVisible">
            <template #title>
                <u-text text="标题"></u-text>
            </template>
            <template #body>
                <u-text>内容</u-text>
            </template>
            <template #foot>
                <u-linear-layout justify="start">
                    <u-button color="primary">确定</u-button>
                    <u-button>取消</u-button>
                </u-linear-layout>
            </template>
        </u-drawer>
        <u-linear-layout gap="small">
            <u-button @click="leftVisible = true">empty</u-button>
        </u-linear-layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            leftVisible: false,
        };
    },
};
</script>
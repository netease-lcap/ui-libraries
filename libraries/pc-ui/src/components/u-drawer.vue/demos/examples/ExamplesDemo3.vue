<!-- 关闭展示首尾插槽 -->
<template>
<div>
    <u-drawer :visible.sync="leftVisible" title="标题" :showHead=false :showFoot=false>
        <template #title>
            <u-text text="标题"></u-text>
        </template>
        <template #default>
            <u-text>内容</u-text>
        </template>
        <template #foot>
            <u-linear-layout justify="center">
                <u-button color="primary">确定</u-button>
                <u-button>取消</u-button>
            </u-linear-layout>
        </template>
    </u-drawer>
    
   <u-drawer :visible.sync="rightVisible" title="标题" :showHead=true :showFoot=true>
        <template #title>
            <u-text text="标题"></u-text>
        </template>
        <template #default>
            <u-text>内容</u-text>
        </template>
        <template #foot>
            <u-linear-layout justify="center">
                <u-button color="primary">确定</u-button>
                <u-button>取消</u-button>
            </u-linear-layout>
        </template>
    </u-drawer>
    <u-linear-layout gap="small">
        <u-button @click="leftVisible = true">hidden</u-button>
        <u-button @click="rightVisible = true">show</u-button>
    </u-linear-layout>
</div>
</template>

<script>
export default {
    data() {
        return {
            leftVisible: false,
            rightVisible: false,
        };
    },
};
</script>
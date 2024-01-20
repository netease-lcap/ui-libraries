<!-- 插槽空缺 -->
<template>
<div>
    <u-drawer :visible.sync="leftVisible" title="标题" :showHead=false :showFoot=false>
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
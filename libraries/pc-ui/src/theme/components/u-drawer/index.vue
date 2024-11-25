<template>
    <div>
        <u-drawer :visible.sync="visible" size="small" title="标题" placement="right">
        </u-drawer>
        <u-button @click="visible = true">抽屉</u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        };
    },
};
</script>
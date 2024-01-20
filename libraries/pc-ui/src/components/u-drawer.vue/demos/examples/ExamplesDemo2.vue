<!-- 抽屉显示位置 -->
<template>
<div>
    <u-drawer placement="left" :visible.sync="leftVisible" title="标题">
    
    </u-drawer>
    <u-drawer placement="right" :visible.sync="rightVisible" title="标题">

    </u-drawer>
    <u-drawer placement="top" :visible.sync="topVisible" title="标题">

    </u-drawer>
    <u-drawer placement="bottom" :visible.sync="bottomVisible" title="标题">

    </u-drawer>
    <u-linear-layout gap="small">
        <u-button @click="leftVisible = true">Left</u-button>
        <u-button @click="rightVisible = true">Right</u-button>
        <u-button @click="topVisible = true">Top</u-button>
        <u-button @click="bottomVisible = true">Bottom</u-button>
    </u-linear-layout>
</div>
</template>

<script>
export default {
    data() {
        return {
            leftVisible: false,
            rightVisible: false,
            topVisible: false,
            bottomVisible: false,
        };
    },
};
</script>
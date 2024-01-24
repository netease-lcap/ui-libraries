<!-- 抽屉尺寸 -->
<template>
<div>
    <u-drawer :visible.sync="smallVisible" size="small" title="标题" :placement="placement">
    </u-drawer>
    <u-drawer :visible.sync="normalVisible" size="normal" title="标题" :placement="placement">
   </u-drawer>
   <u-drawer :visible.sync="largeVisible" size="large" title="标题" :placement="placement">
   </u-drawer>
   <u-drawer :visible.sync="autoVisible" size="auto" title="标题" :placement="placement">
        <template #body>
            <u-linear-layout :style="{ width: placement === 'right'?'500px':'', height: placement === 'bottom'?'calc(100vh - 200px)':''}">auto width/height</u-linear-layout>
        </template>
   </u-drawer>
   <u-linear-layout direction="vertical">
    <u-linear-layout gap="small">
            <u-button @click="placement = 'right'">right</u-button>
            <u-button @click="placement = 'bottom'">bottom</u-button>
        </u-linear-layout>

    <u-linear-layout gap="small">
            <u-button @click="smallVisible = true">small</u-button>
            <u-button @click="normalVisible = true">normal</u-button>
            <u-button @click="largeVisible = true">large</u-button>
            <u-button @click="autoVisible = true">auto</u-button>
        </u-linear-layout>
    </u-linear-layout>
   
</div>
</template>

<script>
export default {
    data() {
        return {
            smallVisible: false,
            normalVisible: false,
            largeVisible: false,
            autoVisible: false,
            placement: 'right'
        };
    },
};
</script>
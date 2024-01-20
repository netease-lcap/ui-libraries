<!-- 灯箱包含单个元素 -->
<template>
<div>
    <u-lightbox :visible.sync="visible" :closeButton="true">
        <u-lightbox-item title="图片预览"><img :src="src" /></u-lightbox-item>
    </u-lightbox>
    <u-linear-layout>
        <u-button @click="visible = true">Open Lightbox</u-button>
    </u-linear-layout>
</div>
</template>
<script>
import image2 from '@/components/u-lightbox.vue/assets/2.jpg';
export default {
    data() {
        return {
            visible: false,
            src: image2,
        };
    },
};
</script>
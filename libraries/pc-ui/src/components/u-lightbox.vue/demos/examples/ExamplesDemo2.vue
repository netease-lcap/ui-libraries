<!-- 灯箱包含多个元素 -->
<template>
<div>
    <u-lightbox :visible.sync="visible" :value="showItem" animation="fade">
        <u-lightbox-item v-for="(image, index) in images" :key="index" :value="index" :title="image.title"><img :src="image.src" /></u-lightbox-item>
    </u-lightbox>
    <u-linear-layout>
        <img style="height: 60px;width:60px" v-for="(image, index) in images" :src="image.src"  @click="showLightbox(index)"/>
    </u-linear-layout>
</div>
</template>
<script>
import image1 from '@/components/u-lightbox.vue/assets/1.jpg';
import image2 from '@/components/u-lightbox.vue/assets/2.jpg';
export default {
    data() {
        return {
            visible: false,
            images: [{src: image1, title:'图片1'}, {src: image2, title: '图片2'}],
            showItem: 0,
        };
    },
    methods: {
        showLightbox(index) {
            this.visible = true;
            this.showItem = index;
        },
    },
};
</script>
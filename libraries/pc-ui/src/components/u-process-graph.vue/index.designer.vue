<template>
    <div :class="$style.root" vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        <div :class="$style.designerImage" v-if="$env.VUE_APP_DESIGNER">
          <img :class="[$style.img, $style.lb]" :src="leftBottomImg" />
          <img :class="[$style.img, $style.rt]" :src="rightTopImg" />
          <img :class="[$style.img, $style.md]" :src="middleImg" />
        </div>
        <component
            v-else
            is="u-process-graph-real"
            v-bind="[$attrs, $props]"
            v-on="$listeners">
        </component>
      </div>
</template>
<script>
import UProcessGraphReal from './index.vue';
import leftBottomImg from './assets/leftbottom.png';
import middleImg from './assets/middle.png';
import rightTopImg from './assets/righttop.png';

export default {
    component: {
        UProcessGraphReal,
    },
    data() {
        return {
            leftBottomImg,
            middleImg,
            rightTopImg
        }
    }
};
</script>

<style module src="./index.css"></style>

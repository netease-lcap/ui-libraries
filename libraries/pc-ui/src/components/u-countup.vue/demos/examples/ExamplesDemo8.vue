<!-- 方法 -->
<template>
    <u-form>
    <u-form-item label="演示效果">
        <u-linear-layout>
        <u-countup ref="countup" :start="start" :end="end" :is-easing="isEasing" :duration="duration"></u-countup>
        <u-button style="vertical-align: bottom;" color="primary" @click="show">开启渐变</u-button>
        <u-button style="vertical-align: bottom;" @click="reset">重置</u-button>
         <u-button style="vertical-align: bottom;" @click="pause">{{ `${isPause?'恢复':'暂停'}` }}</u-button>
        </u-linear-layout>
    </u-form-item>
    <u-form-item label="结束值">
        <u-input v-model.number="end"></u-input>
    </u-form-item>
    <!-- 不支持动态改变属性 -->
    <!-- <u-form-item label="渐变时间">
        <u-input v-model.number="duration"></u-input>
    </u-form-item>
    <u-form-item label="启用动画函数">
        <u-capsules :value.sync="isEasing">
            <u-capsule :value="false">false</u-capsule>
            <u-capsule :value="true">true</u-capsule>
        </u-capsules>
    </u-form-item> -->
    </u-form>
</template>
<script>
export default{
    data() {
        return {
            start: 0,
            end: 100,
            duration: 2,
            isEasing: true,
            isPause: false,
        };
    },
    methods: {
        show() {
            // if (this.autoStart)
                this.$refs.countup.update(this.end)
            // else
            //   this.autoStart = true;
        },
        reset() {
            this.$refs.countup.reset();
        },
        pause() {
            this.isPause = !this.isPause;
            this.$refs.countup.pauseResume();
        }
    },
};
</script>
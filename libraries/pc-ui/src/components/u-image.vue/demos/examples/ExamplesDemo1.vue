<!-- 模拟异步展示图片 -->
<template>
    <u-image :src="url" style="width: 300px; height: 150px;" fit="contain"></u-image>
</template>

<script>
export default {
    data() {
        return {
            url: '',
        };
    },
    mounted() {
        setTimeout(()=>{
            this.url = "https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"
        }, 2000)
    },
    methods: {
        load() {
            return new Promise((resolve)=>{
                setTimeout(()=>resolve("https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"), 2000)
            })
            // return "https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"
        }
    },
}
</script>
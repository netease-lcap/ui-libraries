<!-- selected 单向绑定 -->
<template>
<m-multiplex>
    <m-multiplex-item value="cup">水杯</m-multiplex-item>
    <m-multiplex-item value="coffee">咖啡</m-multiplex-item>
    <m-multiplex-item value="nut" selected>坚果</m-multiplex-item>
    <m-multiplex-item value="towel" selected>毛巾</m-multiplex-item>
    <m-multiplex-item value="sofa">沙发</m-multiplex-item>
</m-multiplex>
</template>
<script>
export default {
    data() {
        return {
            values: ['nut', 'towel'],
        };
    },
};
</script>
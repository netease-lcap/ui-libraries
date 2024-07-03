<template>

<div><van-button @click="onOpen">Popup</van-button>

<van-popup :value.sync="showpopup" ref="poph5" :close-on-click-overlay="true" position="bottom" safe-area-inset-bottom evn="picker"><div vusion-slot-name="default" style="min-height: 200px;width: 100vw;" :vusion-disabled-cut="true"></div></van-popup></div>

</template>
<script>
export default {
    data() {
        return {
            showpopup: false,
        };
    },
    methods: {
        onOpen() {
            this.$refs.poph5.openModal();
        },
    },
};
</script>

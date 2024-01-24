<!-- 列表与 value 同时改变的问题 -->
<template>
<div>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            <u-text size="normal">可用区</u-text>
            <u-radios v-model="selectedAz">
                <u-radio label="azA">可用区A</u-radio>
                <u-radio label="azB">可用区B</u-radio>
            </u-radios>
        </u-linear-layout>
        <u-linear-layout>
            <u-text size="normal">网络{{ selectedVpc }}</u-text>
            <u-select v-model="selectedVpc">
                <u-select-item v-for="item in vpcOptions" :key="item.value" :value="item.value">A {{ item.text }}</u-select-item>
            </u-select>
        </u-linear-layout>
    </u-linear-layout>
</div>
</template>

<script>
export default {
    data() {
        return {
            azMap: {
                azA: [
                    { text: 'classic', value: 'classic' },
                    { text: 'defaultVPC', value: 'defaultVPC' },
                ],
                azB: [
                    { text: 'devVPC', value: 'devVPC' },
                    { text: 'onlineVPC', value: 'onlineVPC' },
                ],
            },
            vpcOptions: [],
            selectedAz: 'azA',
            selectedVpc: 'classic',
        };
    },
    watch: {
        selectedAz(value) {
            this.vpcOptions = this.azMap[value];
            if (this.vpcOptions.length > 0) {
                this.selectedVpc = this.vpcOptions[0].value;
            }
        },
    },
    created() {
        this.vpcOptions = this.azMap[this.selectedAz];
        if (this.vpcOptions.length > 0) {
            this.selectedVpc = this.vpcOptions[0].value;
        }
    },
};
</script>
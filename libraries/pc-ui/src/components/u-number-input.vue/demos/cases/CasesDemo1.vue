<!-- 基本用法 -->
<template>
<u-linear-layout>
    <u-number-input v-model="value1" formatter="0000"></u-number-input>
    <u-number-input v-model="value2" :precision="0.01" :step="0.1" formatter="#,##0.00元"></u-number-input>
    <u-number-input v-model="value3" :precision="1" :step="1" formatter="0.000%"></u-number-input>
    <u-number-input
        v-model="value4"
        :precision="0.005"
        :step="0.005"
        :thousandths="true"
        :decimalPlacesValue="3"
        :decimalPlacesOmitZero="false"
        :percentSign="true"
        unitType="prefix"
        unitValue="$"
    ></u-number-input>
</u-linear-layout>
</template>

<script>
    export default {
        data() {
            return {
                value1: 20,
                value2: 1234,
                value3: 20.12314,
                value4: null,
            }
        }
    }
</script>

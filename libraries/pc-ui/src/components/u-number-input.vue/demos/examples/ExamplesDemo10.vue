<!-- 小数位数和格式化 -->

<template>
  <div><u-linear-layout>
    <u-number-input :value="20" :decimalLength="10"></u-number-input>
    <u-number-input :value="1.20" :decimalLength="3" :decimalPlacesValue="2" :decimalPlacesOmitZero="false"></u-number-input>
    <u-number-input :value="1.20" :decimalLength="3" :decimalPlacesValue="2" :decimalPlacesOmitZero="true"></u-number-input>
    <u-number-input :value="1.234" unitValue="$"></u-number-input>
    <u-number-input :value="1.234" unitType="suffix" unitValue="%"></u-number-input>
    <u-number-input :value.sync="value" :decimalLength="3" :advancedFormatEnable="true" advancedFormatValue="#.#"></u-number-input>
    <u-number-input :value="20" :advancedFormatEnable="true" advancedFormatValue="0000"></u-number-input>
    <u-number-input :value="1234" :precision="0.01" :step="0.1" :advancedFormatEnable="true" advancedFormatValue="$ #,##0.00"></u-number-input>
    <u-number-input :value="20" :precision="0.5" :step="0.5" :advancedFormatEnable="true" advancedFormatValue="0.0%"></u-number-input>
</u-linear-layout></div>
</template>

<script>
export default {
    data() {
        return {
            value: 1.234,
        };
    },
    watch: {
        value(val) {
            console.log(val);
        }
    }
};
</script>
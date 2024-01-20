<!-- 高级格式化 -->
<template>
<div>
    <div>展示保留3位小数 不省略0；值保留2位小数</div>
    <u-number-input 
        v-model="value" 
        placeholder="请输入" 
        :decimal-places="{ places:3, omit:false }" 
        :thousandths="false" 
        :percent-sign="true"
        :decimalLength="2"></u-number-input>
    <div>值： {{value}}</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: 1
        }
    }
}
</script>
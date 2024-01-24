<!-- 复合验证规则 -->
<template>
<u-form gap="large">
    <u-form-item label="名称1" required rules="nameBase | rangeLength(4,12) | unique(existingList)">
        <u-input size="huge medium" maxlength="12" placeholder="4-12个字符"></u-input>
    </u-form-item>
    <u-form-item label="名称2" required rules="nameBase | rangeLength(8,24)">
        <u-input size="huge medium" maxlength="24" placeholder="8-24个字符"></u-input>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    rules: {
        nameBase: 'required | ^azAZ | ^azAZ09-$ | azAZ09$',
    },
    data() {
        return {
            existingList: ['abcd', 'aaaa', 'ABCD'],
        };
    },
};
</script>
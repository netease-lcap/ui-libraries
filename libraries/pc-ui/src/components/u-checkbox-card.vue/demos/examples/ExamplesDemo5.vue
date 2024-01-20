<!-- 表单校验 -->
<template>
<u-form>
    <u-form-item label="选择环境" placement="bottom" layout="block" :rules="rules">
        <u-checkbox-card :column="3" size="large" :data="data"></u-checkbox-card>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            value: [],
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
            },{
                text: 'region-1',
                value: '5',
            }],
            rules: [{
                type: 'array',
                message: '环境为必填项',
                trigger: 'input',
                validator: (rule, value, callback) => {
                    if (!value||value.length === 0) {
                        console.log('error');
                        callback(new Error());
                    } else
                        callback();
                },
            }]
        };
    },
};
</script>
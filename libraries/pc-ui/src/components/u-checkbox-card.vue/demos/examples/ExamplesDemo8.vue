<!-- 自定义选择项 -->
<template>
<u-linear-layout>
    <u-checkbox-card :column="3" size="large" v-model="value" :data="data">
        <div style="display: inline-block;" slot-scope="scope">
            {{scope.data.text}}
            <span v-if="scope.data.error" style="width: 10px;height: 10px;padding: 0px;border-radius: 100%;display: inline-block;background: #ff8a7a;"></span>
        </div>
    </u-checkbox-card>
</u-linear-layout>
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
                disabled: true,
            },{
                text: 'yiqiao-public',
                value: '3',
                error: true,
            },{
                text: 'liantong-public',
                value: '4',
                disabled: true,
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
};
</script>
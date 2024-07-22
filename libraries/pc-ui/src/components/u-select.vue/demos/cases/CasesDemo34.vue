<!-- 选中值是下一页数据的选中处理 -->
<template>
<u-linear-layout>
    <u-select :data-source="load"
              pageable remote-paging
              filterable remote-filtering
              clearable
              :value.sync="value">
    </u-select>
    <u-select :data-source="load"
              pageable remote-paging
              clearable
              :value.sync="remoteValue">
    </u-select>
    <u-select multiple :data-source="load"
              pageable remote-paging
              clearable
              style="width: 240px"
              :value.sync="values"></u-select>
    <u-select multiple :data-source="load"
            pageable remote-paging
            clearable
            style="width: 240px"
            :value.sync="remoteValues"></u-select>
    <u-select multiple :data-source="load"
            pageable remote-paging
            clearable
            style="width: 240px"
            :value.sync="remoteValues1"
            converter="join:|"></u-select>
    <u-select :data-source="load"
        pageable remote-paging
        filterable remote-filtering
        clearable
        :value.sync="value"
        :autoCheckSelectedValue="false"
        :selectedValuesData="[{currentText: 'detail30', value: 'detail30'}]"></u-select>
    <u-select :data-source="load"
        pageable remote-paging
        remote-filtering
        clearable
        :value.sync="value"
        :autoCheckSelectedValue="false"
        :selectedValuesData="[{text: 'detail30', value: 'detail30'}]"></u-select>
</u-linear-layout>
</template>
<script>
// 模拟构造数量较多的 500 条后端数据
let remoteData = [];
for (let i = 1; i <= 500; i++) {
    remoteData.push('item' + i);
    remoteData.push('info' + i);
    remoteData.push('detail' + i);
}
remoteData = remoteData.map((text) => ({ text, value: text }));

export default {
    data() {
        return {
            value: 'detail30',
            values: ['detail30', 'info30'],
            remoteValue: undefined,
            remoteValues: undefined,
            remoteValues1: undefined,
        }
    },
    created() {
        setTimeout(()=>{
            this.remoteValue = 'detail45';
            this.remoteValues =  ['detail45', 'info45'];
            this.remoteValues1 = 'detail45|info45';
        }, 300);
    },
    methods: {
        load({ filterText, paging }) {
            const value = filterText ? filterText.toLowerCase() : '';

            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData.filter((item) => item.value.includes(value))
                        .slice(paging.offset, paging.offset + paging.limit)
                    );
                }, 300);
            });
        },
    },
};
</script>

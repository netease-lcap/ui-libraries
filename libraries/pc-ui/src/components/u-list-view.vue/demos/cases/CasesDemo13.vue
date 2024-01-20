<!-- 后端分页，reload后分页问题 -->
<template>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            <u-button @click="reload">刷 新</u-button>
            <u-button @click="resetPageSizeAndNumber">重置页码和页数</u-button>
        </u-linear-layout>
        <u-list-view :data-source="load" :page-size="pageSize" :page-number="pageNumber" :pageable="true" :show-sizer="true" :page-size-options="[10,20,50]" remote-paging ref="listview" @page="onPage"></u-list-view>
    </u-linear-layout>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟构造数量较多的 500 条后端数据
const mockData = (() => {
    let mockData = [];
    const total = 500;
    for (let i = 1; i <= total; i++)
        mockData.push('item' + i);
    return mockData.map((text) => ({ text, value: text }));
})();
// 模拟数据服务
const mockService = {
    loadWithTotal(offset, limit) {
        return mockRequest({
            total: mockData.length,
            data: mockData.slice(offset, offset + limit),
        });
    },
    loadWithLast(offset, limit) {
        return mockRequest({
            last: offset + limit >= mockData.length,
            data: mockData.slice(offset, offset + limit),
        });
    },
    loadOnlyArray(offset, limit) {
        return mockRequest(mockData.slice(offset, offset + limit));
    },
};

export default {
    data() {
        return {
            result1: undefined,
            pageSize: 20,
            pageNumber: 1,
        };
    },
    methods: {
        load({ paging }) {
            return mockService.loadWithTotal(paging.offset, paging.limit)
                .then((result1) => this.result1 = result1); // 这句只是在 Demo 中打印一下数据，方便查看
        },
        reload() {
            this.$refs.listview.reload();
        },
        onPage(paging) {
            this.pageSize = paging.size;
            this.pageNumber = paging.number;
        },
        resetPageSizeAndNumber() {
            this.pageSize = 20;
            this.pageNumber = 1;    
        }
    },
};
</script>
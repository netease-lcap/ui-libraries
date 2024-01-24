<!-- 后端加载更多 -->
<template>
<u-linear-layout>
    <u-select multiple :data-source="load1" placeholder="返回带 total"
        pageable remote-paging></u-select>
    <u-select multiple :data-source="load2" placeholder="返回带 last"
        pageable remote-paging></u-select>
    <u-select multiple :data-source="load3" placeholder="只返回数组"
        pageable remote-paging></u-select>
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
            result2: undefined,
            result3: undefined,
        };
    },
    methods: {
        load1({ paging }) {
            return mockService.loadWithTotal(paging.offset, paging.limit)
                .then((result1) => this.result1 = result1); // 这句只是在 Demo 中打印一下数据，方便查看
        },
        load2({ paging }) {
            return mockService.loadWithLast(paging.offset, paging.limit)
                .then((result2) => this.result2 = result2); // 这句只是在 Demo 中打印一下数据，方便查看
        },
        load3({ paging }) {
            return mockService.loadOnlyArray(paging.offset, paging.limit)
                .then((result3) => this.result3 = result3); // 这句只是在 Demo 中打印一下数据，方便查看
        },
    },
};
</script>
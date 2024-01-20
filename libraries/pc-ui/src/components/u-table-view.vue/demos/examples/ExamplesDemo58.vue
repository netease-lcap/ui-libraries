<!-- 导出 Excel -->
<template>
    <u-linear-layout direction="vertical">
        <u-button color="primary" @click="() => $refs.tableView.exportExcel()">导出 Excel</u-button>
        <u-table-view ref="tableView" pageable :remote-paging="true" :data-source="load" title="表格标题">
            <u-table-view-column type="index" width="60" title="序号"></u-table-view-column>
            <u-table-view-column title="创建时间">
                <template #cell="scope">
                        <u-text :text="scope.item.student.createdTime"></u-text>
                </template>
            </u-table-view-column>
            <u-table-view-column title="name">
                <template #cell="scope">
                        <u-text :text="scope.item.student.name"></u-text>
                </template>
            </u-table-view-column>
            <u-table-view-column title="输入">
                <template #cell="scope">
                    <u-linear-layout gap="small">
                        <u-input :value="100"></u-input>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
            <u-table-view-column title="选择">
                <template #cell="scope">
                    <u-linear-layout gap="small">
                           <u-select placeholder="自定义">
                                <u-select-item value="java">JS</u-select-item>
                                <u-select-item value="nodejs">Node.js</u-select-item>
                            </u-select>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
            <u-table-view-column title="操作">
                <template #cell="scope">
                    <u-linear-layout gap="small">
                        <u-link text="修改" @click="modify($event,scope)"></u-link>
                        <u-link text="删除" @click="remove($event,scope)"></u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
            <u-table-view-column title="日期">
                <template #cell="scope">
                    <u-date-picker date="2018-08-08"></u-date-picker>
                </template>
            </u-table-view-column>
        </u-table-view>
    </u-linear-layout>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟数据服务
const mockService = {
    load() {
        return {"number":1,"last":false,"size":20,"numberOfElements":20,"totalPages":20,"content":[{"student":{"id":1137630473356288,"createdTime":"2021-11-11T03:05:37.000Z","updatedTime":"2021-11-11T03:05:37.000Z","createdBy":null,"updatedBy":null,"name":"张三","age":10}},{"student":{"id":1137631165416448,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_0","age":35}},{"student":{"id":1137631165416449,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_1","age":57}},{"student":{"id":1137631165416450,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_2","age":44}},{"student":{"id":1137631165416451,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_3","age":25}},{"student":{"id":1137631165416452,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_4","age":75}},{"student":{"id":1137631165416453,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_5","age":8}},{"student":{"id":1137631165416454,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_6","age":52}},{"student":{"id":1137631165416455,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_7","age":31}},{"student":{"id":1137631165416456,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_8","age":44}},{"student":{"id":1137631169610752,"createdTime":"2021-11-11T03:08:23.000Z","updatedTime":"2021-11-11T03:08:23.000Z","createdBy":null,"updatedBy":null,"name":"name_9","age":21}},{"student":{"id":1137631303828480,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_10","age":83}},{"student":{"id":1137631303828481,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_11","age":10}},{"student":{"id":1137631303828482,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_12","age":79}},{"student":{"id":1137631308022784,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_13","age":93}},{"student":{"id":1137631308022785,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_14","age":44}},{"student":{"id":1137631308022786,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_15","age":70}},{"student":{"id":1137631308022787,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_16","age":81}},{"student":{"id":1137631308022788,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_17","age":11}},{"student":{"id":1137631308022789,"createdTime":"2021-11-11T03:08:56.000Z","updatedTime":"2021-11-11T03:08:56.000Z","createdBy":null,"updatedBy":null,"name":"name_18","age":90}}],"first":true,"totalElements":20,"empty":false};
    },
};

export default {
    methods: {
        load() {
            return mockService.load();
        },
    },
};
</script>
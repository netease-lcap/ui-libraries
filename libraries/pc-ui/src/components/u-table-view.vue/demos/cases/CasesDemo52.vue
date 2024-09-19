<!-- 基本类型数组 -->
<template>
<div>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            <u-text>绑定变量</u-text>
            <u-table-view striped :dataSource="data" style="max-height: 300px;" :pagination="false">
                <u-table-view-column title="序号"></u-table-view-column>
                <u-table-view-column title="姓名">
                    <template #cell="current">
                        <u-text>{{ current.item }}</u-text>
                    </template>
                </u-table-view-column>
            </u-table-view>
        </u-linear-layout>
        <u-linear-layout>
            <u-text>绑定同步逻辑</u-text>
            <u-table-view striped :dataSource="load" style="max-height: 300px;" :pagination="false">
                <u-table-view-column title="序号"></u-table-view-column>
                <u-table-view-column title="姓名">
                    <template #cell="current">
                        <u-text>{{ current.item }}</u-text>
                    </template>
                </u-table-view-column>
            </u-table-view>
        </u-linear-layout>
        <u-linear-layout>
            <u-text>绑定异步逻辑</u-text><u-button @click="$refs.tableView.reload()">刷新</u-button>
            <u-table-view striped :dataSource="load1" style="max-height: 300px;" :pagination="false" ref="tableView">
                <u-table-view-column title="序号"></u-table-view-column>
                <u-table-view-column title="姓名">
                    <template #cell="current">
                        <u-text>{{ current.item }}</u-text>
                    </template>
                </u-table-view-column>
            </u-table-view>
        </u-linear-layout>
    </u-linear-layout>
    
</div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            data: [1,2,3],
        };
    },
    methods: {
        load() {
            return [1,2,3];
        },
        load1() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(['a', 'b', 'c']);
                }, 500);
            });
        }
    }
};
</script>
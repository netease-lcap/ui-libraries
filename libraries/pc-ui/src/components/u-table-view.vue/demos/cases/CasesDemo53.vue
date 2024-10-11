<!-- 虚拟列表 -->
<template>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            <u-text>普通表格-同步数据源</u-text>
            <u-number-input v-model="rowIndex1"></u-number-input>
            <u-button @click="scrollToElement1">scrollToElement</u-button>
            <u-button @click="setData">改变数据</u-button>
        </u-linear-layout>
        <u-table-view striped :dataSource="data"  style="max-height: 400px" ref="tableView1">
            <u-table-view-column title="用户名" field="name" width="15%" ellipsis></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%" ellipsis></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-text>普通表格-异步数据源</u-text>
            <u-number-input v-model="rowIndex2"></u-number-input>
            <u-button @click="scrollToElement2">scrollToElement</u-button>
            <u-button @click="$refs.tableView2.reload()">刷新</u-button>
        </u-linear-layout>
        <u-table-view striped :dataSource="load"  style="max-height: 400px" ref="tableView2">
            <u-table-view-column title="用户名" field="name" width="15%" ellipsis></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%" ellipsis></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-text>虚拟滚动表格-静态数据源</u-text>
            <u-number-input v-model="rowIndex3"></u-number-input>
            <u-button @click="scrollToElement3">scrollToElement</u-button>
            <u-button @click="setData">改变数据</u-button>
        </u-linear-layout>
        <u-table-view striped :dataSource="data" virtual  style="max-height: 500px" ref="tableView3" :itemHeight="41">
            <u-table-view-column title="用户名" field="name" width="15%" ellipsis></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%" ellipsis></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-text>虚拟滚动表格-异步数据源</u-text>
            <u-number-input v-model="rowIndex4"></u-number-input>
            <u-button @click="scrollToElement4">scrollToElement</u-button>
            <u-button @click="$refs.tableView4.reload()">刷新</u-button>
        </u-linear-layout>
        <u-table-view striped :dataSource="load" virtual  style="max-height: 500px" ref="tableView4" :itemHeight="41">
            <u-table-view-column title="用户名" field="name" width="15%" ellipsis></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%" ellipsis></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-text>虚拟滚动表格-没有设置itemHeight</u-text>
        </u-linear-layout>
        <u-table-view striped :dataSource="data" virtual style="max-height: 500px">
            <u-table-view-column title="用户名" field="name" width="15%" ellipsis></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%" ellipsis></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-text>普通表格-同步数据源-跳转列</u-text>
            <u-number-input v-model="rowIndex5"></u-number-input>
            <u-button @click="scrollToElement5">scrollToElement</u-button>
            <u-input v-model="columnField5"></u-input>
            <u-button @click="scrollToElementColumn5">scrollToElementColumn</u-button>
        </u-linear-layout>
        <u-table-view striped :dataSource="data"  style="max-height: 400px" ref="tableView5" :defaultColumnWidth="400">
            <u-table-view-column title="用户名" field="name" ellipsis fixed></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" ellipsis></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-text>虚拟滚动表格-静态数据源-跳转列</u-text>
            <u-number-input v-model="rowIndex6"></u-number-input>
            <u-button @click="scrollToElement6">scrollToElement</u-button>
            <u-input v-model="columnField6"></u-input>
            <u-button @click="scrollToElementColumn6">scrollToElementColumn</u-button>
        </u-linear-layout>
        <u-table-view striped :dataSource="data" virtual  style="max-height: 500px" ref="tableView6" :itemHeight="41" :defaultColumnWidth="400">
            <u-table-view-column title="用户名" field="name" ellipsis fixed></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" ellipsis></u-table-view-column>
            <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" ellipsis></u-table-view-column>
        </u-table-view>
    </u-linear-layout>
    </template>
    <script>
    const baseData = [
        { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
        { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
        { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
        { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
        { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
    ];

    // 构造数量较多的 500 条数据
    const remoteData = [];
    for (let i = 0; i < 75; i++) {
        const item = Object.assign({}, baseData[i % 5]);
        item.name += '-' + i;
        item.phone = String(+item.phone + i);
        item.createdTime += i * 1000 * 3600 * 24;
        item.loginTime += i * 1000 * 3600 * 24;
        remoteData.push(item);
    }

    export default {
        data() {
            const baseData = [
                { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
                { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
                { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
                { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
                { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
            ];
    
            // 构造数量较多的 500 条数据
            const data = [];
            for (let i = 0; i < 100; i++) {
                const item = Object.assign({}, baseData[i % 5]);
                item.name += '-' + i;
                item.phone = String(+item.phone + i);
                item.createdTime += i * 1000 * 3600 * 24;
                item.loginTime += i * 1000 * 3600 * 24;
                data.push(item);
            }
    
            return { 
                data,
                rowIndex1: null,
                rowIndex2: null,
                rowIndex3: null,
                rowIndex4: null,
                rowIndex5: null,
                columnField5: null,
            };
        },
        methods: {
            load({ paging }) {
                // 这里使用 Promise 和 setTimeout 模拟一个后端请求
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({
                            total: remoteData.length,
                            data: remoteData.slice(paging.offset, paging.offset + paging.limit),
                        });
                    }, 400);
                });
            },
            scrollToElement1() {
                this.$refs.tableView1.scrollToElement(this.rowIndex1);
            },
            scrollToElement2() {
                this.$refs.tableView2.scrollToElement(this.rowIndex2);
            },
            scrollToElement3() {
                this.$refs.tableView3.scrollToElement(this.rowIndex3);
            },
            scrollToElement4() {
                this.$refs.tableView4.scrollToElement(this.rowIndex4);
            },
            setData() {
                this.data[0].name = '张三-5';
                this.data[5].name = '张三-51';
                this.data = [...this.data];
            },
            scrollToElement5() {
                this.$refs.tableView5.scrollToElement(this.rowIndex5);
            },
            scrollToElementColumn5() {
                this.$refs.tableView5.scrollToElement(this.rowIndex5, null, this.columnField5);
            },
            scrollToElement6() {
                this.$refs.tableView6.scrollToElement(this.rowIndex6);
            },
            scrollToElementColumn6() {
                this.$refs.tableView6.scrollToElement(this.rowIndex6, null, this.columnField6);
            },
        },
    };
    </script>
<!-- tab切换虚拟滚动状态重置 -->

<template>
    <div>
        <u-tabs :value.sync="value"
                :dataSource="loadTabs"
                titleField="title"
                valueField="value"
                closableField="closable"
                showScrollButtons='auto'
                ref="tabs1"
                @select="onSelectTab">
            <template #title="current">{{ current.item && current.item.title }}title</template>
            <template #content="current">{{ current.item && current.item.title }}content</template>
        </u-tabs>
       <u-button @click="onClickReload">click reload</u-button>
       <u-input :value.sync="inputValue"></u-input>
       <!-- <u-table-view striped :data-source="load1" pagination resizable :page-size="1000" ref="tableview" virtual :item-height="42" style="max-height: 600px" ellipsis>
            <u-table-view-column-dynamic :data-source="loadSubList" ellipsis>
                <div slot="title" slot-scope="{ columnItem }">
                    <u-text>{{ columnItem.name }}</u-text>
                </div>
                <template #cell="{ item, columnItem, index }">
                    <u-text>{{index}}{{ item.name }} {{ columnItem.name }}</u-text>
                </template>
            </u-table-view-column-dynamic>
        </u-table-view> -->
        <u-table-view striped :data-source="list" pagination resizable :page-size="1000" ref="tableview" virtual :item-height="42" style="max-height: 600px" ellipsis>
            <u-table-view-column-dynamic :data-source="loadSubList" ellipsis>
                <div slot="title" slot-scope="{ columnItem }">
                    <u-text>{{ columnItem.name }}</u-text>
                </div>
                <template #cell="{ item, columnItem, index }">
                    <u-text>{{index}}{{ item.name }} {{ columnItem.name }}</u-text>
                </template>
            </u-table-view-column-dynamic>
        </u-table-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 1,
            inputValue: 1,
            list: [],
        };
    },
    methods: {
        loadTabs() {
            const data = [{
                title: '标签页 1',
                value: 1,
                contentUrl: '/components/u-tabs/cases',
                closable: true,
            }, {
                title: '标签页 2',
                value: 2,
                contentUrl: '/components/u-tabs/cases#形态',
                closable: false,
            }, {
                title: '标签页 3',
                value: 3,
                contentUrl: '/components/u-tabs/cases#添加',
                closable: true,
            }] ;
            for (let i = 0; i < 5; i++) {
                const newData = data.map((item) => {
                    const index = Math.floor(Math.random() * data.length);
                    return { ...item, index, value: item.value + index}
                });
                data.push(...newData);
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data);
                }, 500);
            });
        },
        onClickReload() {
            console.log('reload');
            this.$refs.tabs1.reload();
            this.$refs.tableview.reload();
        },
        load() {
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            const index = Math.random() * 20 >> 0;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.tabList.map((item)=>{
                        const newItem = Object.assign({}, item);
                        newItem.title = `${item.title}${index}`;
                        return newItem;
                    }));
                }, 500);
            });
        },
        load1(params) {
            const data = [{ id: '07cdcb8ed5e94cec', name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
                { id: '5cd49be8f65c4738', name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
                { id: 'f799a0467c494601', name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
                { id: '40e8ca488a1c4bce', disabled: true, name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
                { id: '150823cc351642b6', name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 }];
            for (let i = 0; i < 10; i++) {
                const newData = data.map((item) => {
                    return { ...item, index: Math.floor(Math.random() * data.length) };
                });
                data.push(...newData);
            }
            
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        list:  data,
                        total: data.length,
                    });
                }, 500);
            });
        },
        loadSubList(params) {
            let data = [{name: `一月份`, columnName:'one'}, {name: `二月份`, columnName:'tow'}];
            for (let i = 0; i < 3; i++) {
                const newData = data.map((item) => {
                    const index = Math.floor(Math.random() * data.length);
                    return { ...item, index, name: `${item.name}-${index}` };
                });
                data.push(...newData);
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data);
                }, 500);
            });
        },
        onSelectTab({ item }) {
            this.$refs.tableview.reload();
            this.load1().then((res)=>{
                this.list = res.list;
            })
        },
    },
};
</script>
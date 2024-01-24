<!-- 表头文字省略展示 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-table-view line="horizontal" striped :data="[
        { id: 1, name: '张三张三张三张三张三张三张三张三张三张三', address: '浙江省杭州市滨江区网商路599号网易大厦', birthday: '19910528' },
        { id: 2, name: '小明', address: '浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园', birthday: '19920914' },
        { id: 3, name: '李四李四李四李四李四李四李四李四李四李四', address: '浙江省杭州市滨江区秋溢路606号西可科技园', birthday: '19900228' },
        { id: 4, name: '李华', address: '浙江省杭州市滨江区长河路590号东忠科技园', birthday: '19891210' },
        { id: 5, name: '王五', address: '浙江省杭州市滨江区网商路599号网易大厦二期', birthday: '19930716' },
    ]" ellipsis>
        <u-table-view-column title="序号" field="id" width="10%"></u-table-view-column>
        <u-table-view-column ellipsis title="这是一个很长很长很长很长很长很长很长很长的名字" field="name" width="20%" th-ellipsis></u-table-view-column>
        <u-table-view-column ellipsis title="地址" field="address"></u-table-view-column>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的出生日期" field="birthday" width="20%" th-ellipsis></u-table-view-column>
        <u-table-view-column-group title="用户信息用户信息用户信息用户信息用户信息用户信息用户信息" th-ellipsis>
            <u-table-view-column title="用户名" field="name"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone"></u-table-view-column>
        </u-table-view-column-group>
    </u-table-view>
    <u-table-view line striped :data-source="[
        { name: '这是一个很长很长很长很长很长很长很长很长的名字', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
        { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
        { name: '名字就是起得这么这么这么这么这么这么长', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
        { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
        { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
    ]" th-ellipsis>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的名字" field="name" width="30%" :th-ellipsis="false"></u-table-view-column>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的手机号码" field="phone" width="20%"></u-table-view-column>
        <u-table-view-column title="地址" field="address">
            <template #title>
                <u-text :text="`这是一个很长很长很长很长很长很长很长很长的更新时间`"></u-text>
            </template>
        </u-table-view-column>
        <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
    <u-table-view line striped :data-source="[
        { name: '这是一个很长很长很长很长很长很长很长很长的名字', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
        { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
        { name: '名字就是起得这么这么这么这么这么这么长', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
        { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
        { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
    ]" th-ellipsis ellipsis>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的名字" field="name" width="30%" :th-ellipsis="false"></u-table-view-column>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的手机号码" field="phone" width="20%"></u-table-view-column>
        <u-table-view-column title="地址" field="address">
            <template #title>
                <u-text :text="`这是一个很长很长很长很长很长很长很长很长的更新时间`"></u-text>
            </template>
        </u-table-view-column>
        <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        <u-table-view-column-group title="用户信息用户信息用户信息用户信息用户信息用户信息用户信息">
            <u-table-view-column title="用户名" field="name"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone"></u-table-view-column>
        </u-table-view-column-group>
    </u-table-view>
    <u-table-view :data-source="[
        { name: '这是一个很长很长很长很长很长很长很长很长的名字', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
        { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
        { name: '名字就是起得这么这么这么这么这么这么长', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
        { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
        { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
    ]"
        :sorting="{ field: 'loginTime', order: 'asc' }"
        :filtering="{ address: '浙江省杭州市滨江区网商路599号网易大厦' }" th-ellipsis>
        <u-table-view-column sortable title="用户名" field="name" width="15%"></u-table-view-column>
        <u-table-view-column sortable title="这是一个很长很长很长很长很长很长很长很长的手机号码" field="phone" width="20%"></u-table-view-column>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的地址" field="address" :filters="[
            { text: '全部' },
            { text: '网易大厦', value: '浙江省杭州市滨江区网商路599号网易大厦' },
            { text: '网易二期', value: '浙江省杭州市滨江区网商路599号网易大厦二期' },
            { text: '英飞特科技园', value: '浙江省杭州市滨江区江虹路459号英飞特科技园' },
            { text: '西可科技园', value: '浙江省杭州市滨江区秋溢路606号西可科技园' },
        ]"></u-table-view-column>
        <u-table-view-column sortable title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
    <u-table-view :data-source="[
        { name: '这是一个很长很长很长很长很长很长很长很长的名字', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
        { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
        { name: '名字就是起得这么这么这么这么这么这么长', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
        { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
        { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
    ]"
        :sorting="{ field: 'loginTime', order: 'asc' }"
        :filtering="{ address: '浙江省杭州市滨江区网商路599号网易大厦' }" th-ellipsis ellipsis>
        <u-table-view-column sortable title="用户名" field="name" width="15%"></u-table-view-column>
        <u-table-view-column sortable title="这是一个很长很长很长很长很长很长很长很长的手机号码" field="phone" width="20%"></u-table-view-column>
        <u-table-view-column title="这是一个很长很长很长很长很长很长很长很长的地址" field="address" :filters="[
            { text: '全部' },
            { text: '网易大厦', value: '浙江省杭州市滨江区网商路599号网易大厦' },
            { text: '网易二期', value: '浙江省杭州市滨江区网商路599号网易大厦二期' },
            { text: '英飞特科技园', value: '浙江省杭州市滨江区江虹路459号英飞特科技园' },
            { text: '西可科技园', value: '浙江省杭州市滨江区秋溢路606号西可科技园' },
        ]" sortable></u-table-view-column>
        <u-table-view-column sortable title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        <u-table-view-column-dynamic :data-source="[{name: '这是个很长很长很长很长很长很长的动态列名称'}]">
            <template slot="title" slot-scope="{ columnItem }">
                <u-text>{{ columnItem.name }}</u-text>
            </template>
            <template slot="cell" slot-scope="{ item, columnItem }">
                <u-text>{{ item.name }} {{ columnItem.name }}</u-text>
            </template>
        </u-table-view-column-dynamic>
    </u-table-view>
</u-linear-layout></div>
</template>
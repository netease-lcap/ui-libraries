<!-- 显隐列配置 -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-table-view striped :data="data" style="max-height: 300px;" configurable>
            <u-table-view-column title="序号" field="id"></u-table-view-column>
            <u-table-view-column title="姓名" field="name"></u-table-view-column>
            <u-table-view-column title="省份" field="province"></u-table-view-column>
            <u-table-view-column title="城市" field="city"></u-table-view-column>
            <template #config-columns>
                <u-table-view-column-config
                    :data-source="loadConfigData"
                    :value="configValue"
                    value-field="key"
                    @select="onSelectConfig"
                    style="color:blue"
                    :show-footer="false">
                    <template #title>
                        <i-ico name="menu"></i-ico>
                        <u-text>配置</u-text>
                    </template>
                    <template #item="current">
                        <u-text :text="current.item.name"></u-text>
                    </template>
                </u-table-view-column-config>
            </template>
        </u-table-view>
        双向绑定的值：{{ configValue }}
    </u-linear-layout>
    <u-linear-layout>
        <u-table-view striped :data="data" style="max-height: 300px;" configurable>
            <u-table-view-column title="序号" field="id"></u-table-view-column>
            <u-table-view-column title="姓名" field="name"></u-table-view-column>
            <u-table-view-column title="省份" field="province"></u-table-view-column>
            <u-table-view-column title="城市" field="city"></u-table-view-column>
            <template #config-columns>
                <u-table-view-column-config
                    :data-source="dataSource"
                    value-field="key"
                    @select="onSelectConfig"
                    style="color:blue"
                    :show-footer="false">
                    <template #title>
                        <i-ico name="menu"></i-ico>
                        <u-text>配置</u-text>
                    </template>
                    <template #item="current">
                        <u-text :text="current.item.name"></u-text>
                    </template>
                </u-table-view-column-config>
            </template>
        </u-table-view>
        <u-button @click="onSetDataSource">点击切换数据源</u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-table-view striped :data="data" style="max-height: 300px;" configurable>
            <u-table-view-column title="序号"><span slot="cell" slot-scope="{ item }">{{ item.id }}</span></u-table-view-column>
            <u-table-view-column title="姓名" field="name"></u-table-view-column>
            <u-table-view-column title="省份" field="province"></u-table-view-column>
            <u-table-view-column title="城市" field="city"></u-table-view-column>
            <template #config-columns>
                <u-table-view-column-config
                    :value.sync="configValue"
                    @select="onSelectConfig">
                    <template #title><i-ico name="add"></i-ico></template>
                </u-table-view-column-config>
            </template>
        </u-table-view>
    </u-linear-layout>
    <u-linear-layout>
        <u-table-view striped :data="data" style="max-height: 300px;" configurable>
            <u-table-view-column title="序号"><span slot="cell" slot-scope="{ item }">{{ item.id }}</span></u-table-view-column>
            <u-table-view-column title="姓名" field="name"></u-table-view-column>
            <u-table-view-column title="省份" field="province"></u-table-view-column>
            <u-table-view-column title="城市" field="city"></u-table-view-column>
            <template #config-columns>
                <u-table-view-column-config
                    :data-source="dataSource1">
                    <template #title><i-ico name="add"></i-ico></template>
                    <template #item="current">
                        <u-text :text="current.item"></u-text>
                    </template>
                </u-table-view-column-config>
            </template>
        </u-table-view>
    </u-linear-layout>
    <u-linear-layout>
        <u-table-view striped :data="data" style="max-height: 300px;" configurable>
            <u-table-view-column title="序号11"><span slot="cell" slot-scope="{ item }">{{ item.id }}</span></u-table-view-column>
            <u-table-view-column title="姓名" field="name"></u-table-view-column>
            <u-table-view-column title="省份" field="province"></u-table-view-column>
            <u-table-view-column title="城市" field="city"></u-table-view-column>
            <template #config-columns>
                <u-table-view-column-config
                    :data-source="['name', 'province']">
                    <template #title><i-ico name="add"></i-ico></template>
                    <template #item="current">
                        <u-text :text="current.item"></u-text>
                    </template>
                </u-table-view-column-config>
            </template>
        </u-table-view>
    </u-linear-layout>
    <u-linear-layout>
        <u-linear-layout>
            <u-popup-combination ref="popup_combination1">
                <template #reference>
                    <i-ico ref="ico2" name="setting" icotype="left">
                        <u-text ref="text28" text="列"></u-text>
                    </i-ico>
                </template>
                <u-checkboxes :value.sync="variable1" :data-source="loadCheckList" value-field="key">
                    <template #item="current">
                        <u-text :text="current.item.name"></u-text>
                    </template>
                </u-checkboxes>
            </u-popup-combination>
        </u-linear-layout>
        <u-table-view striped :data="data" style="max-height: 300px;" configurable>
            <u-table-view-column title="序号" field="id"></u-table-view-column>
            <u-table-view-column title="姓名" field="name"></u-table-view-column>
            <template #config-columns>
                <u-table-view-column-config
                    :data-source="loadCheckList"
                    :value.sync="variable1"
                    text-field="name"
                    value-field="key"
                    :hiddenConfig="true">
                </u-table-view-column-config>
            </template>
            <u-table-view-column title="省份" field="province"></u-table-view-column>
            <u-table-view-column title="城市" field="city"></u-table-view-column>
        </u-table-view>
    </u-linear-layout>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
                { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
                { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
                { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
                { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
                { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
                { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
                { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
                { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
                { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
            ],
            configData: ['姓名', '省份', '城市'].map((item) => ({ text: item, value: item })),
            configValue: ['name', 'province'],
            variable1: ['name'],
            variable2: [],
            dataSource: undefined,
            dataSource1: ['name', 'province'],
        };
    },
    methods: {
        loadConfigData() {
            console.log('loadConfigData');
             return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([{name: '姓名', key: 'name'}, {name: '省份', key: 'province'}]);
                }, 500);
            });
        },
        onSelectConfig(value) {
            console.log('onSelectConfig', value);
        },
        loadCheckList() {
            return [{name: '姓名', key: 'name'}, {name: '省份', key: 'province'}, {name: '城市', key: 'city'}];
        },
        onSetDataSource() {
            console.log('set');
            this.seting = !this.seting;
            this.dataSource = this.seting?this.loadConfigData:undefined;
        }
    }
};
</script>
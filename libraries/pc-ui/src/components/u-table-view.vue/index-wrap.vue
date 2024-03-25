<!-- <template> -->
    <!-- <u-table-view v-bind="[$attrs, $props]">
        <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
    </u-table-view> -->
    <!-- <u-table-view :dataSource="dataSource">
        <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
    </u-table-view> -->
    <!-- <u-table-view :dataSource="dataSource">
        <u-table-view-column v-for="content in contents" :title="content.props.title" :field="content.props.field" width="20%"></u-table-view-column>
    </u-table-view> -->
    <!-- <u-table-view :dataSource="dataSource">
        <slot></slot>
    </u-table-view> -->
    <!-- <u-table-view :dataSource="dataSource">
        <component v-for="content in contents" :is="content.component" :key="content.key" v-bind="content.props"></component>
    </u-table-view> -->
    <!-- <div><slot></slot></div> -->
<!-- </template> -->

<script>
import uTableView from './index.vue';
export default {
    name: 'u-table-view-wrap',
    props: {
        dataSource: {
            type: Array,
            value: () => [],
        },
        contents: {
            type: Array,
            value: () => [],
        },
    },
    render(h) {
        return h('u-table-view', {
            props: this.$attrs,
        }, this.$slots.default);
    },
    // render(createElement) {
    //     return createElement(uTableView, {
    //         props: this.$attrs,
    //         on: this.$listeners,
    //         slots: this.$slots,
    //         scopedSlots: this.$scopedSlots,
    //     });
    // },
    updated(value) {
        console.log('updated',value);
    },
}
</script>
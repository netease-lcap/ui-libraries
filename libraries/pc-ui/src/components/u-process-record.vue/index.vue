<template>
    <div>
        <template v-if="type === 'timeline'">
            <u-timeline :data-source="list" :class="$style.timeline">
                <template #item="current">
                    <u-timeline-item :class="$style.titem">
                        <template #dot>
                            <div :class="$style.dot" :status="getDotStatus(current.item)"></div>
                        </template>
                        <div :class="$style.title">{{ current.item.nodeTitle }}</div>
                        <div :class="$style.item">
                            <div :class="$style.left">
                                <div :class="$style.label">{{ $tt('assignee') }}</div>
                                <div :class="$style.label">{{ $tt('recordCreateTime') }}</div>
                                <div :class="$style.label">{{ $tt('nodeOperation') }}</div>
                                <div :class="$style.label">{{ $tt('comment') }}</div>
                            </div>
                            <div :class="$style.content">
                                <div :class="$style.value">{{ current.item.userName || '-' }}</div>
                                <div :class="$style.value">{{ dateFormatter(current.item.recordCreatedTime) || '-' }}</div>
                                <div :class="$style.value">
                                    <span :class="$style.statuslabel" :status="current.item.nodeOperation">{{ current.item.nodeOperationDisplayText || '-' }}</span>
                                </div>
                                <div :class="$style.value">{{ current.item.nodeOperationComment || '-' }}</div>
                            </div>
                        </div>
                    </u-timeline-item>
                </template>
            </u-timeline>
            <div :class="$style.dstatus">
                <template v-if="currentLoading">
                    <u-loading icon="loading" size="small"></u-loading>
                    <div><u-text v-if="currentLoading">{{ $tt('loading') }}</u-text></div>
                </template>
                <u-link v-else-if="hasMore" @click="loadMore">{{ $tt('loadMore') }}</u-link>
                <!-- <u-text v-else-if="list.length > 0">{{ $tt('noMore') }}</u-text> -->
                <u-text v-else-if="list.length === 0">{{ $tt('empty') }}</u-text>
            </div>
        </template>
        <template v-else>
            <u-table-view
                :data-source="loadTable"
                ref="tableview"
                :page-size="paging.size"
                :page-number="paging.number"
                pagination
                :initial-load="initialLoad">
                <u-table-view-column :title="$tt('currentNode')">
                    <template #cell="current"> {{ current.item.nodeTitle || '-' }}</template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('assignee')">
                    <template #cell="current"> {{ current.item.userName || '-' }}</template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('recordCreateTime')">
                    <template #cell="current"> {{ dateFormatter(current.item.recordCreatedTime) }}</template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('nodeOperation')">
                    <template #cell="current">
                        <span :class="$style.statuslabel" :status="current.item.nodeOperation">{{ current.item.nodeOperationDisplayText || '-' }}</span>
                    </template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('comment')">
                    <template #cell="current"> {{ current.item.nodeOperationComment || '-' }}</template>
                </u-table-view-column>
            </u-table-view>
        </template>
    </div>
</template>

<script>
import i18nMixin from '../../mixins/i18n';
export default {
    name: 'u-process-record',
    mixins: [i18nMixin('u-process-record')],
    props: {
        type: {
            type: String,
            default: 'table',
        },
        initialLoad: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            detail: {
                startBy: '',
                createTime: '',
                finished: false,
                currentNode: '',
                currentCandidateUsers: [],
            },
            taskId: undefined,
            list: [],
            paging: {
                size: 20,
                number: 1,
                total: 0,
            },
            currentLoading: false,
        };
    },
    computed: {
        hasMore() {
            return this.list.length < this.paging.total;
        },
    },
    watch: {
        type(value) {
            if (value === 'timeline') {
                this.paging.number = 1;
                this.list = [];
                this.loadList();
            }
        },
    },
    created() {
        location.search.replace('?', '').split('&').forEach((item) => {
            const [key, value] = item.split('=');
            if (key === 'taskId') {
                this.taskId = value;
            }
        });
        if (this.taskId && this.type === 'timeline' && this.initialLoad) {
            this.list = [];
            this.loadList();
        }
    },
    methods: {
        dateFormatter(value) {
            // eslint-disable-next-line new-cap
            return this.$utils ? this.$utils.FormatDateTime(value) : value;
        },
        async loadList() {
            this.currentLoading = true;
            if (this.$processV2) {
                
                try {
                    const result = await this.$processV2.getProcInstRecords({
                        body: {
                            taskId: this.taskId,
                            size: this.paging.size,
                            page: this.paging.number,
                        },
                    });
                    const list = result.data.list || [];
                    this.list = this.list.concat(list);
                    this.paging.total = result.data.total;
                    this.currentLoading = false;
                } finally {
                    this.currentLoading = false;
                }
            }
        },
        loadMore() {
            this.paging.number += 1;
            this.loadList();
        },
        async loadTable(params) {
            if (this.$processV2) {
                const result = await this.$processV2.getProcInstRecords({
                    body: {
                        taskId: this.taskId,
                        size: params.size,
                        page: params.page,
                    },
                });
                return result.data;
            } else {
                return {
                    list: [],
                    total: 0,
                };
            }
        },
        getDotStatus(item) {
            if(['revert', 'reject'].includes(item.nodeOperation)) {
                return 'error';
            }
            if(['approve', 'submit'].includes(item.nodeOperation)) {
                return 'success';
            }
            return 'normal';
        }
    },
};
</script>

<style module src="./index.css"></style>

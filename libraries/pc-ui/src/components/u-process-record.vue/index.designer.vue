<template>
    <div v-if="$env.VUE_APP_DESIGNER" :designer="$env.VUE_APP_DESIGNER" vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        <template v-if="type === 'timeline'">
            <u-timeline :data-source="list" :class="$style.timeline">
                <template #item="current">
                    <u-timeline-item :class="$style.titem">
                        <template #dot>
                            <div :class="$style.dot" :status="getDotStatus(current.item)"></div>
                        </template>
                        <div :class="$style.title">{{ current.item.nodeTitle }}（示例）</div>
                        <div :class="$style.item">
                            <div :class="$style.left">
                                <div :class="$style.label">{{ $tt('assignee') }}</div>
                                <div :class="$style.label">{{ $tt('recordCreateTime') }}</div>
                                <div :class="$style.label">{{ $tt('nodeOperation') }}</div>
                                <div :class="$style.label">{{ $tt('comment') }}</div>
                            </div>
                            <div :class="$style.content">
                                <div :class="$style.value">{{ current.item.userName || '-' }}</div>
                                <div :class="$style.value">{{ current.item.recordCreatedTime || '-' }}</div>
                                <div :class="$style.value">
                                    <span :class="$style.statuslabel" :status="current.item.nodeOperation">{{ current.item.nodeOperationDisplayText || '-' }}</span>
                                </div>
                                <div :class="$style.value">{{ current.item.comment || '-' }}</div>
                            </div>
                        </div>
                    </u-timeline-item>
                </template>
            </u-timeline>
        </template>
        <template v-else>
            <u-table-view :data-source="list">
                <u-table-view-column :title="$tt('currentNode')">
                    <template #cell="current"> {{ current.item.nodeTitle || '-' }}</template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('assignee')">
                    <template #cell="current"> {{ current.item.userName || '-' }}</template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('recordCreateTime')">
                    <template #cell="current"> {{ current.item.recordCreatedTime }}</template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('nodeOperation')">
                    <template #cell="current">
                        <span :class="$style.statuslabel" :status="current.item.nodeOperation">{{ current.item.nodeOperationDisplayText || '-' }}</span>
                    </template>
                </u-table-view-column>
                <u-table-view-column :title="$tt('comment')">
                    <template #cell="current"> {{ current.item.comment || '-' }}</template>
                </u-table-view-column>
            </u-table-view>
        </template>
    </div>
    <component
        v-else
        is="u-process-record-real"
        v-bind="[$attrs, $props]"
        v-on="$listeners">
    </component>
</template>
<script>
import i18nMixin from '../../mixins/i18n';
export default {
    mixins: [i18nMixin('u-process-record')],
    props: {
        type: {
            type: String,
            default: 'table',
        },
    },
    data() {
        return {
            list: [
                {
                    nodeTitle: '开始',
                    userName: '张三',
                    recordCreatedTime: '2023-12-21 10:20:20',
                    nodeOperation: 'submit',
                    nodeOperationDisplayText: '',
                    nodeOperationComment: '',
                },
                {
                    nodeTitle: '领导审批',
                    userName: '李领导',
                    recordCreatedTime: '2023-12-21 10:20:20',
                    nodeOperation: 'approve',
                    nodeOperationDisplayText: '同意',
                    nodeOperationComment: '',
                },
                {
                    nodeTitle: '总监审批',
                    userName: '王总监',
                    recordCreatedTime: '2023-12-21 10:20:20',
                    nodeOperation: 'reject',
                    nodeOperationDisplayText: '拒绝',
                    nodeOperationComment: '请做好交接工作再提交审批',
                },
            ],
        };
    },
    methods: {
        getDotStatus(item) {
            if(['revert', 'reject'].includes(item.nodeOperation)) {
                return 'error';
            }
            if(['approve', 'submit'].includes(item.nodeOperation)) {
                return 'success';
            }
            return 'normal';
        }
    }
};
</script>

<style module src="./index.css"></style>

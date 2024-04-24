<template>
    <div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('startBy') }}：</div>
            <div :class="$style.value" v-ellipsis-title>{{ detail.procInstInitiator || '-' }}</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('processStartTime') }}：</div>
            <div :class="$style.value" v-ellipsis-title>{{ dateFormatter(detail.procInstStartTime) }}</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('finished') }}：</div>
            <div :class="$style.value" v-ellipsis-title> {{ formatStatus(detail.procInstStatus) }}</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('currentNodes') }}：</div>
            <div :class="$style.value" v-ellipsis-title> {{ formatCurrentNodes(detail) }}</div>
        </div>
        <div :class="$style.item">
            <div :class="$style.label">{{ $tt('currentCandidateUsers') }}：</div>
            <div :class="$style.value" v-ellipsis-title>{{ formatCurrentAssignee(detail) }}</div>
        </div>
    </div>
</template>

<script>
import i18nMixin from '../../mixins/i18n';
export default {
    name: 'u-process-info',
    mixins: [i18nMixin('u-process-info')],
    data() {
        return {
            detail: {
                procInstInitiator: '',
                procInstStartTime: '',
                procInstStatus: '',
                procInstCurrNodes: [],
            },
            taskId: undefined,
        };
    },
    created() {
        location.search.replace('?', '').split('&').forEach((item) => {
            const [key, value] = item.split('=');
            if (key === 'taskId') {
                this.taskId = value;
            }
        });
        if (this.taskId) {
            this.getProcessInfo();
        }
    },
    methods: {
        async getProcessInfo() {
            if (this.$processV2) {
                const result = await this.$processV2.getProcInstInfo({
                    body: {
                        taskId: this.taskId,
                    },
                });
                this.detail = result.data || {};
            }
        },
        dateFormatter(value) {
            // eslint-disable-next-line new-cap
            return this.$utils ? this.$utils.FormatDateTime(value) : value;
        },
        formatStatus(value) {
            if (value === null || value === undefined || value === '') {
                return '-';
            }
            if (value.toLowerCase() === 'approved') {
                return this.$tt('approvedStatus');
            } else if (value.toLowerCase() === 'approving') {
                return this.$tt('approvingStatus');
            } else {
                return value;
            }
        },
        formatCurrentNodes(item) {
            const procInstCurrNodes = item.procInstCurrNodes || [];
            const set = new Set(procInstCurrNodes.map((task) => task.currNodeTitle));
            return Array.from(set).join('，');
        },
        formatCurrentAssignee(item) {
            const procInstCurrNodes = item.procInstCurrNodes || [];
            let currNodeParticipants = [];
            procInstCurrNodes.forEach((task) => {
                currNodeParticipants = currNodeParticipants.concat(task.currNodeParticipants);
            });
            const set = new Set(currNodeParticipants);
            return Array.from(set).join('，') || '-';
        },
    },
};
</script>

<style module src="./index.css"></style>

<template>
    <u-process-myprocess-real v-if="$env.VUE_APP_DESIGNER" ref="myprocess" :initial-load="false" vusion-disabled-duplicate="true" vusion-disabled-copy="true"></u-process-myprocess-real>
    <component
        v-else
        is="u-process-myprocess-real"
        v-bind="[$attrs, $props]"
        v-on="$listeners">
    </component>
</template>
<script>
import UProcessMyprocessReal from './index.vue';

export default {
    component: {
        UProcessMyprocessReal,
    },
    mounted() {
        if (this.$refs.myprocess) {
            this.timer = setTimeout(() => {
                this.$refs.myprocess.$refs.tableview.currentDataSource.arrangedData = [
                    {
                        taskId: '3df4ffc2-ba8f-11ee-94b2-aa63f0d148e3',
                        taskTitle: 'x',
                        procInstTitle: '张三申请事假1天',
                        procDefTitle: '请假流程',
                        procInstInitiator: '张三',
                        procInstStartTime: '2024-01-24 10:00:00',
                        procInstCurrNodes: [
                            {
                                currNodeTitle: '主管审批',
                                currNodeParticipants: [
                                    '主管A',
                                ],
                            },
                        ],
                    },
                    {
                        taskId: '219ea9dd-ba8f-11ee-a35a-a2041721ddc7',
                        taskTitle: 'x',
                        procInstTitle: '张三申请事假1天',
                        procDefTitle: '请假流程',
                        procInstInitiator: '张三',
                        procInstStartTime: '2024-01-24 10:00:00',
                        procInstCurrNodes: [
                            {
                                currNodeTitle: '主管审批',
                                currNodeParticipants: [
                                    '主管A',
                                ],
                            },
                        ],
                    },
                    {
                        taskId: '219ea9dd-ba8f-11ee-a35a-a2041721ddc7',
                        taskTitle: 'x',
                        procInstTitle: '张三申请事假1天',
                        procDefTitle: '请假流程',
                        procInstInitiator: '张三',
                        procInstStartTime: '2024-01-24 10:00:00',
                        procInstCurrNodes: [
                            {
                                currNodeTitle: '主管审批',
                                currNodeParticipants: [
                                    '主管A',
                                ],
                            },
                        ],
                    },
                ];
                clearTimeout(this.timer);
            });
        }
    },
};
</script>

const myPendingTaskList = Array(3).fill({
  taskBoxTitle: '审批任务',
  taskId: 'ac3809cb-ba69-11ee-bb3f-fa9450476323',
  procInstTitle: '张三申请事假1天',
  procDefTitle: '请假流程',
  procInstInitiator: '张三',
  procInstStartTime: '2024-01-24T03:35:52.000Z',
  procInstCurrNodes: [
    {
      currNodeTitle: '主管审批',
      currNodeParticipants: ['主管A'],
    },
  ],
});

const allProcess = Array(2).fill({
  procDefKey: 'Process1_dswe23f1',
  procDefTitle: '流程1',
  procDefDescription: null,
  suspended: false,
});

const allInitiator = Array(2).fill({
  userId: 'xxxxxxxxx1',
  userName: '张三',
  extensionInfos: null,
});

export default {
  myPendingTaskList,
  myCompletedTaskList: [],
  myLaunchList: [],
  allProcess,
  allInitiator,
};

export const records = Array.from({ length: 50 }, (v, k) => {
  const data = [
    {
      nodeTitle: '开始（示例）',
      userName: '张三',
      recordCreatedTime: '2023-12-21T07:40:04.000Z',
      nodeOperation: 'submit',
      nodeOperationDisplayText: '',
      nodeOperationComment: '',
    },
    {
      nodeTitle: '领导审批（示例）',
      userName: '李领导',
      recordCreatedTime: '2023-12-22T07:40:04.000Z',
      nodeOperation: 'approve',
      nodeOperationDisplayText: '同意',
      nodeOperationComment: '',
    },
    {
      nodeTitle: '总监审批（示例）',
      userName: '王总监',
      recordCreatedTime: '2023-12-23T07:40:04.000Z',
      nodeOperation: 'reject',
      nodeOperationDisplayText: '不同意',
      nodeOperationComment: '请做好交接工作再提交审批',
    },
  ];

  return data[k % 3];
});

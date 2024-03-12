export const records = Array.from({ length: 50 }, (v, k) => {
  const data = [
    {
      nodeTitle: '开始（示例）',
      userName: '张三',
      recordCreateTime: '2023-12-21T07:40:04.000Z',
      nodeOperation: 'submit',
      nodeOperationText: '',
      comment: '',
    },
    {
      nodeTitle: '领导审批（示例）',
      userName: '李领导',
      recordCreateTime: '2023-12-22T07:40:04.000Z',
      nodeOperation: 'approve',
      nodeOperationText: '同意',
      comment: '',
    },
    {
      nodeTitle: '总监审批（示例）',
      userName: '王总监',
      recordCreateTime: '2023-12-23T07:40:04.000Z',
      nodeOperation: 'reject',
      nodeOperationText: '不同意',
      comment: '请做好交接工作再提交审批',
    },
  ];

  return data[k % 3];
});

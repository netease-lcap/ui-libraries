export const records = Array.from({ length: 50 }, () => {
  const op = ['submit', 'approve', 'reject', 'revert', 'transfer', 'withdraw'];
  const nodeOperation = op[Math.floor(Math.random() * op.length)];

  return {
    nodeTitle: '发起任务',
    userName: '章三',
    recordCreateTime: '2023-12-21T07:40:04.000Z',
    nodeOperation,
    nodeOperationText: '提交了一个任务',
    comment: '无',
  };
})

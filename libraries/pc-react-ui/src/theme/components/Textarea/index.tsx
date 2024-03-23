import React from 'react';
import { Space } from 'antd';
import { TextArea } from '@/index';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      <TextArea rows={4} />
      <TextArea status="error" placeholder="Error" />
      <TextArea status="warning" placeholder="Warning" />
    </Space>
  );
};

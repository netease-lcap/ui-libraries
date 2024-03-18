import React from 'react';
import { Space } from 'antd';
import PreviewDemos from 'antd-token-previewer/es/previews/components/input';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      {...PreviewDemos.map(({ demo }) => demo)}
    </Space>
  );
};

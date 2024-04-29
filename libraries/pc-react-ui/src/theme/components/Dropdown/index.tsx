import React from 'react';
import { Space } from 'antd';
import '../../reset-antd';
import PreviewDemos from 'antd-token-previewer/es/previews/components/dropdown';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      {...PreviewDemos.map(({ demo }) => demo)}
    </Space>
  );
};

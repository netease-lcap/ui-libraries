import React from 'react';
import { Space } from 'antd';
import '../reset-antd';
import {
  Primary,
  Success,
  Error,
  Warning,
} from 'antd-token-previewer/es/previews/overviews';

export default () => {
  return (
    <Space size={24} style={{ width: 1940 }} align="start">
      <Space size={24} direction="vertical">
        <Primary id="overview-primary" />
        <Success id="overview-success" />
      </Space>
      <Space size={24} direction="vertical">
        <Error id="overview-error" />
        <Warning id="overview-warning" />
      </Space>
    </Space>
  );
};

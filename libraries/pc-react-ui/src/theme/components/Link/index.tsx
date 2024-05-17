/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Space } from 'antd';
import { Link } from '@/index';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      <Link children="这是一条链接" />
      <Link children="这是一条链接" disabled />
    </Space>
  );
};

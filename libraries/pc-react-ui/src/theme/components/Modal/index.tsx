/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Space, Modal } from 'antd';
import PurePanel from './PurePanel';

Modal._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

// eslint-disable-next-line import/first
import PreviewDemos from 'antd-token-previewer/es/previews/components/modal';

export default () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      {...PreviewDemos.filter(({ key }) => key !== 'info').map(({ demo }) => demo)}
    </Space>
  );
};

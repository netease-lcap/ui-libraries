/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { ConfigProvider } from 'antd';
import styles from './index.module.css';

export const renderAppPreview = (app: any) => {
  return (
    <ConfigProvider
      theme={
        {
          cssVar: { prefix: 'cw', key: 'cw-nasl' },
        }
      }
      prefixCls="cw"
    >
      {app}
    </ConfigProvider>
  );
};

export const ComponentWrap = ({
  name,
  title,
  demo,
  actived,
  onClick,
}) => {
  return (
    <div
      id={name}
      className={[
        styles.componentCard,
        'cw-nasl',
        'cw-card',
        actived ? styles.active : '',
      ].join(' ')}
      key={name}
      onClick={onClick}
    >
      <div className={styles.componentCardTitle}>
        {title || name}
      </div>
      <div className={styles.componentCardBody}>
        {demo}
      </div>
    </div>
  );
};

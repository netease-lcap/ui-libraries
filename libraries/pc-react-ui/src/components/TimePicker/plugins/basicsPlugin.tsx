import locale from 'antd/lib/date-picker/locale/zh_CN';
import React from 'react';
// import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export function useHandleLocale() {
  return {
    locale,
  };
}
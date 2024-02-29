import locale from 'antd/lib/date-picker/locale/zh_CN';
import React from 'react';
import 'dayjs/locale/zh-cn';

export function useHandleLocale() {
  return {
    locale,
  };
}

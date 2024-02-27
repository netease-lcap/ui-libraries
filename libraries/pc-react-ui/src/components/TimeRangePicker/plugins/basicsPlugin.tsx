import locale from 'antd/lib/date-picker/locale/zh_CN';
import React from 'react';
// import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export function useHandleLocale() {
  return {
    locale,
  };
}
export function useHandleRef(props) {
  const mutableProps = props.get('mutableProps');
  const ref = props.get('ref');
  const selfRef = React.useRef({});
  React.useImperativeHandle(ref, () => ({
    ...selfRef.current,
  }), [selfRef]);
  mutableProps.setState({ ref: selfRef });
  return {};
}

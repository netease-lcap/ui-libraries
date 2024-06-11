import _ from 'lodash';
import React from 'react';
import {
  ConfigProvider,
} from 'antd';

export function useHandleStyleTheme(props) {
  const BaseComponent = props.get('render');
  const style = props.get('style');
  const fontSize = _.get(style, 'fontSize');
  const color = _.get(style, 'color');
  const render = React.useCallback(React.forwardRef((localProps, ref) => {
    return (
      <ConfigProvider theme={{
        components: {
          Input: _.filterUnderfinedValue({
            colorText: color,
            fontSize,
          }),
        },
        cssVar: { prefix: 'cw', key: 'cw-nasl' },
      }}
      >
        <BaseComponent {...localProps} ref={ref} />
      </ConfigProvider>
    );
  }), [BaseComponent]);
  return {
    render,
  };
}

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
  const render = React.useCallback((localProps) => {
    return (
      <ConfigProvider theme={{
        components: {
          TreeSelect: _.filterUnderfinedValue({
            colorText: color,
            fontSize,
          }),
        },
      }}
      >
        <BaseComponent {...localProps} />
      </ConfigProvider>
    );
  }, [BaseComponent]);
  return {
    render,
  };
}

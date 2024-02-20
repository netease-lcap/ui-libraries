import React from 'react';
import * as AntdIcon from '@ant-design/icons';

const iconType = 'MessageOutlined';

export function Icon(props) {
  return (
    <div>
      {
        React.createElement(
          AntdIcon[props!.iconType ?? 'MessageOutlined'],
          {
            style: { fontSize: '16px', color: '#08c' },
            ...props,
          },
        )
      }
    </div>
  );
}

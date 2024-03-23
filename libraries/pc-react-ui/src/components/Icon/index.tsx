import React from 'react';
import * as AntdIcon from '@ant-design/icons';
import _ from 'lodash';

function SvgComponent(src) {
  return (
    <svg style={{ height: '14px', width: '14px' }}>
      <image style={{ height: '14px', width: '14px' }} xlinkHref={src} />
    </svg>
  );
}
export function Icon(props) {
  const isAntIcon = _.curry(_.get)(AntdIcon)(_, false);
  const result = _.cond([
    [isAntIcon, _.constant(React.createElement(AntdIcon[props]))],
    [_.stubTrue, SvgComponent],
  ]);
  return result(props);
}
interface IconProps {
  iconName: string
}

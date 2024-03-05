import React from 'react';
import * as AntdIcon from '@ant-design/icons';
import AndtIconProps from '@ant-design/icons';
import _ from 'lodash';

const iconType = 'MessageOutlined';
// export const Icon = () => {
//   return <div />;
// };
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
    [_.isValidLink, SvgComponent],
    [isAntIcon, _.constant(React.createElement(AntdIcon[props]))],
    [_.stubTrue, _.identity],
  ]);
  // const Icon = AntdIcon[iconName];
  return result(props);
}
interface IconProps {
  iconName: string
}
// export const Icon = React.forwardRef<typeof AndtIconProps, IconProps>((props, ref) => {
//   const { iconName } = props;
//   const isAntIcon = _.curry(_.get)(AntdIcon)(_, false);
//   const result = _.cond([
//     [_.isValidLink, SvgComponent],
//     [isAntIcon, isAntIcon],
//     [_.stubTrue, TextIcon],
//   ]);
//   // /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
//   // const Icon = AntdIcon[iconName];
//   return result(iconName) as React.ReactNode;
// });

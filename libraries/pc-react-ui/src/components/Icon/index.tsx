import React from 'react';
import * as AntdIcon from '@ant-design/icons';
import AndtIconProps from '@ant-design/icons';
import _ from 'lodash';

const iconType = 'MessageOutlined';
export const Icon = () => {
  return <div />;
};
function SvgComponent(src) {
  return (
    <div>
      <svg width="100" height="100">
        <image xlinkHref={src} />
      </svg>
    </div>
  );
}
function TextIcon(text) {
  return <span>{text}</span>;
}
// export function Icon(props) {
//   const { iconName } = props;
//   const isAntIcon = _.curry(_.get)(AntdIcon)(_, false);
//   const result = _.cond([
//     [_.isValidLink, SvgComponent],
//     [isAntIcon, isAntIcon],
//     [_.stubTrue, _.identity],
//   ]);
//   // /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
//   // const Icon = AntdIcon[iconName];
//   return result(iconName);
// }
// interface IconProps {
//   iconName: string
// }
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

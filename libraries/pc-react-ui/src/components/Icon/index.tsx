import React from 'react';
import * as AntdIcon from '@ant-design/icons';
import _ from 'lodash';
// import { RiHeartFill, RiArrowRightUpLine } from '@remixicon/react';
import 'remixicon/fonts/remixicon.css';

function SvgComponent(src) {
  return (
    <svg style={{ height: '14px', width: '14px' }}>
      <image style={{ height: '14px', width: '14px' }} xlinkHref={src} />
    </svg>
  );
}
export function Icon(props) {
  return (
    <i className="ri-admin-line" />
  );
}
interface IconProps {
  iconName: string
}

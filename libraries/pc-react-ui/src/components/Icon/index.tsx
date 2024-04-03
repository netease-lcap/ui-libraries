/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import 'remixicon/fonts/remixicon.css';

export function Icon(props) {
  // _.isValidLink
  const name = props.name ?? 'RiNeteaseCloudMusicLine';
  if (name?.includes('.svg')) {
    return <img src={name} width={20} alt="icon" />;
  }
  return (
    <i {...props} className={_.kebabCase(name)} />
  );
}
interface IconProps {
  iconName: string
}

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import _ from 'lodash';
import 'remixicon/fonts/remixicon.css';

export function Icon(props) {
  // _.isValidLink
  // https://remixicon.com/
  // https://remixicon.com/icon/arrow-right-up-line
  const name = props.name ?? 'RiNeteaseCloudMusicLine';
  if (name?.includes('.svg')) {
    return <img {...props} src={name} width={20} alt="icon" />;
  }
  return (
    <i {...props} className={_.kebabCase(name)} />
  );
}
interface IconProps {
  iconName: string
}

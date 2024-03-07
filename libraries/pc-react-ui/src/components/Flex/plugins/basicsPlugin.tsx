import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import style from '../index.module.less';

export function useHandleClassName(props) {
  const cls = classnames(style.flex, props.className);
  return {
    className: cls,
  };
}

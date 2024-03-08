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

export function useHandleScroll(props) {
  const scroll = props.get('scroll');
  const result = scroll ? { style: { overflow: 'scroll' } } : {};
  console.log(result, 'result===');
  return result;
}

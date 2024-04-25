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

export function useHandleFullChild(props) {
  return {
    mode: 'flex',
  };
}
export function useHandleScroll(props) {
  const styleProps = props.get('style');
  const scroll = props.get('scroll');
  const result = scroll ? { style: { ...styleProps, overflow: 'scroll' } } : {};
  return result;
}

export function useHandleMatchProps(props) {
  const directionProps = props.get('direction');
  const verticalProps = props.get('vertical');
  const direction = directionProps === 'vertical';
  const alignmentProps = props.get('alignment');
  const align = props.get('align');
  return {
    vertical: verticalProps ?? direction,
    align: align ?? alignmentProps,
  };
}

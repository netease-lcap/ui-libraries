import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { ProFormTextArea } from '@ant-design/pro-components';
import style from '../index.module.less';

export function useHandleRef(props) {
  const onChangeProps = props.get('onChange');
  const result = {
    onChange: _.wrap(onChangeProps, (fn, e: React.ChangeEvent<HTMLInputElement>) => {
      fn(e?.target?.value, e);
    }),
  };
  return _.isFunction(onChangeProps) ? result : {};
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.textArea, className),
  };
}

export function useHandleThemeStyle(props) {
  const className = props.get('rootClassName');
  return {
    rootClassName: classnames('cw-textarea cw-textarea-css-var', className),
  };
}

export function useHandleFormItemComponent() {
  return {
    FormItemComponent: ProFormTextArea,
  };
}
useHandleFormItemComponent.order = 2;

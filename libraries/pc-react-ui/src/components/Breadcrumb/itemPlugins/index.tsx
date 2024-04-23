import _ from 'lodash';
import React from 'react';
import { useHandleLink } from '@/plugins/common/index';
import { Icon } from '@/index';

export function useHandleHref(props) {
  const destination = props.get('destination');
  const clickProps = props.get('onClick', () => { });
  const handleLink = useHandleLink();
  const target = props.get('target');
  return {
    onClick: _.wrap(clickProps, (fn, arg) => {
      _.attempt(fn, arg);
      handleLink(destination, target);
    }),
  };
}

export function useHandleIcon(props) {
  const icon = props.get('icon');
  const children = props.get('children');
  console.log(icon, children, '=======');
  const BaseComponents = props.get('render');
  const render = React.useCallback((selfProps) => {
    return (
      <BaseComponents {..._.omit(selfProps, 'children')}>
        <Icon name={icon} style={{ marginRight: '4px', fontSize: 'inherit', color: 'inherit' }} />
        {selfProps.children}
      </BaseComponents>
    );
  }, [BaseComponents, icon]);

  if (!icon) return {};
  return {
    render,
  };
}

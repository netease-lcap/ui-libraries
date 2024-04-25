import classnames from 'classnames';
import React from 'react';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import { Icon } from '@/index';

export function useHandleLink(props) {
  const deletePropsList = props.get($deletePropsList).concat(['destination', 'link']);
  const destination = props.get('destination');
  const link = props.get('link');
  return {
    [$deletePropsList]: deletePropsList,
    href: destination ?? link,
  };
}

export function useHandleThemeStyle(props) {
  const className = props.get('className');
  return {
    className: classnames('cw-link cw-link-css-var', className),
  };
}

export function useHandleIcon(props) {
  const iconProps = props.get('icon');
  const BaseComponent = props.get('render');
  const render = React.useCallback((localProps) => {
    return (
      <BaseComponent {...localProps}>
        {localProps.children}
        {!_.isNil(iconProps) && (
          <Icon
            style={{ marginLeft: '10px' }}
            name={iconProps}
          />
        )}
      </BaseComponent>
    );
  }, [BaseComponent, iconProps]);
  return {
    render,
  };
}

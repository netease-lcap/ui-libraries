import _ from 'lodash';
import React from 'react';
import { Icon } from '@/index';

export function useHandleIcon(props) {
  const icon = props.get('icon');
  return _.isNil(icon) ? {} : { icon: <Icon name={icon} /> };
}
export function useHandleLabel(props) {
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelSlot = props.get('labelSlot');
  const label = labelIsSlot ? labelSlot : labelProps;
  return {
    label,
  };
}

export function useHandlePath(props) {
  const path = props.get('path');
  const destination = props.get('destination');
  return {
    path: path ?? destination,
  };
}

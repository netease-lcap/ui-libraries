import _ from 'lodash';
import React from 'react';
import { Icon } from '@/index';

export function useHandleIcon(props) {
  const icon = props.get('icon');
  return _.isNil(icon) ? {} : { icon: <Icon name={icon} /> };
}

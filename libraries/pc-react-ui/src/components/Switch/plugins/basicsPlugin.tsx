import React from 'react';
import _ from 'lodash';
import { Switch } from 'antd';
import { Col, FormItem } from '@/index';
import FormContext from '@/components/Form/form-context';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import { $deletePropsList } from '@/plugins/constants';

export function useHandle(props) {

}

export function useHandleBasicsComponent() {
  return {
    BasicsComponent: Switch,
  };
}
useHandleBasicsComponent.order = 2;

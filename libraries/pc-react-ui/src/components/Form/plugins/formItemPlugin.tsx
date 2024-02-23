// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Col } from '@/index';

export function useHandle(props) {
  console.log('object');
  return {
    render(selfProps) {
      const Compoent = props.get('render');
      const ColPorps = ['offset', 'span'];
      return (
        <Col span={24} {..._.pick(selfProps, ColPorps)}>
          <Compoent key="component" {...selfProps}>{selfProps.children}</Compoent>
        </Col>
      );
    },
  };
}

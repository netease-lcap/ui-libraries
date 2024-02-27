// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Row } from '@/index';

export function useHandle(props) {
  return {
    render(selfProps) {
      const Compoent = props.get('render');
      const rowProps = ['gutter', 'align', 'justify', 'wrap'];
      return (
        <Compoent key="component" {..._.omit(selfProps, rowProps)}>
          <Row key="row" {..._.pick(selfProps, rowProps)}>{selfProps.children}</Row>
        </Compoent>
      );
    },
  };
}

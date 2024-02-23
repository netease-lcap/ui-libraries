// import fp from 'lodash/fp';
import React from 'react';
import { Row } from '@/index';

export function useHandle(props) {
  return {
    render(selfProps) {
      const Compoent = props.get('render');
      return (
        <Compoent key="component" {...selfProps}>
          <Row key="row">{selfProps.children}</Row>
        </Compoent>
      );
    },
  };
}

// import React from 'react';
import _ from 'lodash';
import { useHandleLink } from '@/plugins/common/index';
// import { theme, Layout } from 'antd';
// import { useNavigate, Link } from 'react-router-dom';

// const { Header, Content, Footer } = Layout;

export function useHandleRouter(props) {
  const onClickPorps = props.get('onClick');
  const path = props.get('path');
  const destination = props.get('destination');
  const target = props.get('target');
  const handleLink = useHandleLink({ path, destination, target });
  return {
    onClick: _.wrap(onClickPorps, (fn, arg) => {
      _.attempt(fn, arg);
      handleLink(path ?? destination, target);
    }),
  };
}

// import React from 'react';
import _ from 'lodash';
// import { theme, Layout } from 'antd';
// import { useLocation, useNavigate } from 'react-router-dom';

// const { Header, Content, Footer } = Layout;

export function useHandleRouter(props) {
  const onClickPorps = props.get('onClick');
  return {
    onClick: _.wrap(onClickPorps, (fn, arg) => {
      // console.log(arg, '1234 ');
      _.attempt(fn, arg);
      if (_.isValidLink(arg.key)) {
        window.location.href = arg.key;
        return;
      }
      window.history.pushState({}, '', arg.key);
    }),
  };
}

// import React from 'react';
import _ from 'lodash';
// import { theme, Layout } from 'antd';
// import { useNavigate, Link } from 'react-router-dom';

// const { Header, Content, Footer } = Layout;

export function useHandleRouter(props) {
  const onClickPorps = props.get('onClick');

  return {
    onClick: _.wrap(onClickPorps, (fn, arg) => {
      _.attempt(fn, arg);
      if (_.isValidLink(arg.key)) {
        window.location.href = arg.key;
        return;
      }
      const event = new CustomEvent('pageNavigation', {
        detail: {
          url: arg.key,
        },
      });
      window.dispatchEvent(event);
    }),
  };
}

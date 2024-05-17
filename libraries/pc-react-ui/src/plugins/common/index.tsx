import _ from 'lodash';
import React from 'react';
import { RouterContext } from '@/components/Router';

export function useHandleLink() {
  const { useNavigate } = React.useContext(RouterContext);
  const navigate = useNavigate?.();
  return async (targetUrl, target) => {
    if (!targetUrl) return;
    if (_.isValidLink(targetUrl) || target === '_blank') {
      const a = document.createElement('a');
      a.setAttribute('href', targetUrl);
      a.setAttribute('target', target);
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 500);
    } else {
      navigate(targetUrl);
    }
  };
}

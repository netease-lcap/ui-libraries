import _ from 'lodash';
import { useControllableValue } from '@/plugins/hooks';
// import React from 'react';
// import { RouterContext } from '@/components/Router';

function useHandleLink() {
  // const { useNavigate } = React.useContext(RouterContext);
  // const navigate = useNavigate?.();
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
      // todo
      // navigate?.(targetUrl);
    }
  };
}

export function handleControllableValue(props: any) {
  const ref = props.get('ref');
  const [, setValue, valueProps] = useControllableValue(props);
  return {
    ...valueProps,
    ref: Object.assign(ref, {
      resetField: () => setValue(undefined),
    }),
  };
}

handleControllableValue.order = 2;

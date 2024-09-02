/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable no-script-url */
/* eslint-disable no-unused-expressions */
// import _ from 'lodash';
import { $deletePropList } from '../constants';
import { NaslComponentPluginOptions } from '../types';
import { getEventKey } from '../utils';

/**
 * 平台跳转设置转 href
 */
export const useLink: NaslComponentPluginOptions = {
  name: 'link2ref',
  props: ['link', 'destination'],
  setup: (props) => {
    const hrefRef = props.useComputed(
      ['link', 'destination', 'href'],
      (link, destination, href) => {
        return href || link || destination;
      },
    );

    return {
      href: hrefRef,
    };
  },
  order: 2,
};

/**
 * vue router 跳转插件，绑定onClick,
 * @param bindEventName 绑定事件名称，默认 click
 */
export const createVueRouterNavigate = (bindEventName: string = 'click') => {
  const useVueRouterNavigate: NaslComponentPluginOptions = {
    setup: (props, { $router }) => {
      const eventName = getEventKey(bindEventName);
      const routerLink = props.useComputed('destination');

      return {
        // href: undefined,
        [eventName]: (e: any) => {
          const disabled = props.get<boolean>('disabled');
          if (disabled === true) {
            e.preventDefault();
            e.returnValue = false;
            return;
          }

          const handle = props.get<(event: any) => void>(eventName);
          handle && handle(e);

          const [target, download] = props.get<[string, boolean | string]>([
            'target',
            'download',
          ]);

          if (!routerLink.value || target === '_blank' || download === true || download === 'download') {
            return;
          }

          e.preventDefault();
          e.returnValue = false;

          const replace = props.get('replace');

          if ($router) {
            replace === true
              ? $router.replace(routerLink.value)
              : $router.push(routerLink.value);
          }
        },
      };
    },
    order: 5,
  };

  return useVueRouterNavigate;
};

/**
 * 浏览器跳转插件，绑定onClick,
 * @param bindEventName 绑定事件名称，默认 click
 */
export const createBrowserNavigate = (bindEventName: string = 'click') => {
  const useBrowserNavigate: NaslComponentPluginOptions = {
    props: ['href', 'target', 'download', 'disabled', 'replace'],
    setup: (props) => {
      const eventName = getEventKey(bindEventName);
      return {
        [eventName]: (e: any) => {
          const disabled = props.get<boolean>('disabled');
          if (disabled === true) {
            return;
          }

          const [href, target, download] = props.get<string[]>([
            'href',
            'target',
            'download',
          ]);

          const handle = props.get<(event: any) => void>(eventName);
          handle && handle(e);

          if (download) {
            const a = document.createElement('a');
            a.setAttribute('href', href);
            a.setAttribute('download', 'download');
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              document.body.removeChild(a);
            }, 500);
            return;
          }

          if (target === '_blank') {
            window.open(href);
            return;
          }

          // replace true
          if (props.get('replace')) {
            location.replace(href);
            return;
          }

          location.href = href;
        },
        [$deletePropList]: ['href', 'target', 'download'],
      };
    },
    order: 6,
  };

  return useBrowserNavigate;
};

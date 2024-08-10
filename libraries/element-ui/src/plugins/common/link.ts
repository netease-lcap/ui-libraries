import { $deletePropList } from '../constants';
import { NaslComponentPluginOptions } from '../plugin';
import { getEventKey } from '../utils';

/**
 * 平台跳转设置转 href
 */
export const useLink: NaslComponentPluginOptions = {
  name: 'link2ref',
  props: ['link', 'destination'],
  setup: (props) => {
    const href = props.useComputed(['link', 'destination', 'href'], (link, destination, href) => {
      return href || link || destination;
    });

    return {
      href,
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
      const routerLink = props.useComputed('href', (url: string) => {
        if (
          url.startsWith('http') ||
          !$router ||
          url.startsWith('://') ||
          url.startsWith('#') ||
          url.startsWith('javascript:') ||
          url.indexOf('://') !== -1) {
          return null;
        }

        const { location } = $router.resolve(url);
        return location;
      });

      const href = props.useComputed('href', (url: string) => {
        /**
         * router link 存在点击默认不处理
         */
        if (!!routerLink.value) {
          return 'javascript:;';
        }

        return url;
      })

      return {
        href,
        [eventName]: (e) => {
          const disabled = props.get<boolean>('disabled');
          if (disabled === true) {
            return;
          }

          const preClick = props.get<(e: any) => void>(eventName);
          if (!routerLink.value) {
            preClick && preClick(e);
            return;
          }
          const replace = props.get('replace');

          replace === true ? $router.replace(routerLink.value) : $router.push(routerLink.value);
        }
      }
    },
    order: 5,
  };

  return useVueRouterNavigate;
}

/**
 * 浏览器跳转插件，绑定onClick,
 * @param bindEventName 绑定事件名称，默认 click
 */
export const createBrowserNavigate = (bindEventName: string = 'click') => {
  const useBrowserNavigate: NaslComponentPluginOptions = {
    props: ['href', 'target', 'download', 'disabled', 'replace'],
    setup: (props, { $router }) => {
      const eventName = getEventKey(bindEventName);
      return {
        [eventName]: (e) => {
          const disabled = props.get<boolean>('disabled');
          if (disabled === true) {
            return;
          }

          const [href, target, download] = props.get<string[]>(['href', 'target', 'download']);

          if (!href || href === 'javascript:;' || href === 'javascript:void(0);') {
            const preClick = props.get<(e: any) => void>(eventName);
            preClick(e);
          }

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
      }
    },
    order: 6,
  }

  return useBrowserNavigate;
}

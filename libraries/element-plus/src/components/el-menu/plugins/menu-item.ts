import _ from 'lodash';
import { MenuItemProps } from 'element-plus';
import Collage from '@lcap/element-ui/design/icons/components/collage';
import { $router } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import itemPlugin from './item-plugin';
import { useControllableValue } from '@/plugins/hooks';

const MenuItemPluginAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElMenuItemOptions,
  MenuItemProps & { destination: string }
>();
export default MenuItemPluginAccumulate.addAccumulate(itemPlugin)
  .addPlugin({
    name: 'handleHrefToRouter',
    handle(props) {
      const destination = props.get('destination');
      const link = props.get('link');
      const href = props.get('href');
      const target = props.get('target');
      const onClick = props.get('onClick') ?? _.noop;
      const router = props.get($router);
      const toRouterClick = _.cond([
        [
          _.matches({ target: '_blank', isExternalLink: true }),
          (params) => () => window.open(params.externalUrl, '_blank'),
        ],
        [
          _.matches({ isExternalLink: true }),
          (params) => () => {
            window.location.href = params.externalUrl;
          },
        ],
        [_.matches({ target: '_blank' }), _.constant(() => {})],
        [_.matches({ isDestination: true }), (params) => () => router.push(params.destination)],
        [_.stubTrue, _.constant(() => {})],
      ]);
      const isHref = !_.isNil(link) || !_.isNil(href);
      const externalUrl = link || href;
      const isDestination = props.has('destination');
      const routerClick = toRouterClick({
        destination,
        target,
        isExternalLink: isHref,
        externalUrl,
        isDestination,
      });

      return {
        onClick: _.wrap(onClick, (fn, ...args) => {
          _.attempt(fn, ...args);
          _.attempt(routerClick, ...args);
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleCollapse',
    handle(props) {
      const [collapse] = useControllableValue(props, {
        defaultValuePropName: 'defaultCollapse',
        valuePropName: 'collapse',
      });
      return {
        collapse,
      };
    },
  });

import _ from 'lodash';
import { LinkProps } from 'element-plus';
import { saveAs } from 'file-saver';
import { $deletePropsList, $router } from '@/plugins/constants';
import { getPropsIcon } from '@/plugins/common/icon';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { useSyncState } from '@/plugins/hooks';

const LinkBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElLinkOptions, LinkProps>();

export default LinkBasicAccumulate.addPlugin({
  name: 'handleTextToSlots',
  handle(props) {
    const text = props.get('text');
    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat('text');
    const icon = props.get('icon');
    return {
      slots: _.assign({}, slots, {
        default: () => text,
      }),
      [$deletePropsList]: deletePropsList,
      icon: getPropsIcon({ name: icon }),
    };
  },
})
  .addPlugin({
    name: 'handleHrefToRouter',
    handle(props) {
      const destination = props.get('destination');
      const link = props.get('link');
      const href = props.get('href');
      const target = props.get('target');
      const onClick = props.get('onClick');
      const router = props.get($router);
      const destinationToRouterClick = _.cond([
        [_.matches({ target: '_blank' }), _.constant(() => {})],
        [
          _.conforms({ destination: _.isString }),
          ({ destination, target }) => () => router.push(destination),
        ],
        [_.stubTrue, _.constant(() => {})],
      ]);
      const routerClick = destinationToRouterClick({ destination, target });
      const isHref = !_.isNil(link) || !_.isNil(href);
      const hrefObject = isHref ? { href: link || href, target } : {};

      return {
        onClick: _.wrap(onClick, (fn, ...args) => {
          _.attempt(fn, ...args);
          _.attempt(routerClick, ...args);
        }),
        ...hrefObject,
      };
    },
  })
  .addPlugin({
    name: 'handleRightIcon',
    handle(props) {
      const rightIcon = props.get('rightIcon');
      if (!rightIcon) return {};
      const slots = props.get('slots');
      return {
        slots: _.assign({}, slots, {
          default: () => [slots.default?.(), getPropsIcon({ name: rightIcon, class: 'el-link__right-icon' })],
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleDownload',
    handle(props) {
      const download = props.get('download');
      const href = props.get('href');
      const click = props.get('onClick', () => {});
      const deletePropsList = props.get($deletePropsList).concat(['href', 'target']);
      if (!download) return {};
      return {
        onClick: _.wrap(click, (fn, ...args) => {
          _.attempt(fn, ...args);
          saveAs(href, href);
        }),
        [$deletePropsList]: deletePropsList,
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      useSyncState(props, 'disabled');
      return {};
    },
  });

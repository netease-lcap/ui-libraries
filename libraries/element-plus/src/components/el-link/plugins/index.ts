import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export * from './ide.ts';

export function handleTextToSlots(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat('text');
  return {
    slots: _.defaults(slots, {
      default: () => text,
    }),
    [$deletePropsList]: deletePropsList,
  };
}

export function handleHrefToRouter(props) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const target = props.get('target');
  const onClick = props.get('onClick');
  const router = props.get('router');
  const destinationToRouterClick = _.cond([
    [_.matches({ target: '_blank' }), _.constant(() => {})],
    [
      _.conforms({ destination: _.isString }),
      ({ destination, target }) => () => router.push(destination, { target }),
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
}

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

function handleHrefToRouter(props) {
  const destination = props.get('destination');
  const link = props.get('link');
  const target = props.get('target');
  const onClick = props.get('onClick');
  const router = props.get('$router');
  const route = props.get('$route');
  // const hrefObj=
  const destinationToRouterClick = _.cond([
    [
      _.isString,
      _.constant((destination) => {
        router.push(destination);
      }),
    ],
    [_.stubTrue, _.constant(() => {})],
  ]);

  return {
    onClick: _.wrap(onClick, (fn, ...args) => {
      _.attempt(fn, ...args);
      _.attempt(destinationToRouterClick, ...args);
    }),
  };
}

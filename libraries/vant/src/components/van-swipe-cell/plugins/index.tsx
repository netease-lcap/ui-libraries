import _ from 'lodash';

export * from './ide';

export function handleBeforeClose(props) {
  const onBeforeClose = props.get('onBeforeClose');
  return {
    beforeClose: _.wrap(onBeforeClose, (fn, ...args) => {
      return _.attempt(fn, ...args);
    }),
  };
}

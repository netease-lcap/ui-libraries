import _ from 'lodash';

export function handleCloseEvents(props) {
  const onBeforeClose = props.get('onBeforeClose');
  const onClosed = props.get('onClosed');

  const beforeClose = _.isNil(onBeforeClose)
    ? onBeforeClose
    : _.wrap(onBeforeClose, (fn, done) => {
        _.attempt(fn, done);
      });

  const closed = _.isNil(onClosed)
    ? onClosed
    : _.wrap(onClosed, (fn, done) => {
        _.attempt(fn, done);
      });

  return {
    beforeClose,
    closed,
  };
}

import _ from 'lodash';

export function handleLeftOffset(props) {
  const leftOffset = props.get('leftOffset') ?? 0;
  const topOffset = props.get('topOffset') ?? 0;
  const offsetProps = props.get('offset');
  const offset = _.isArray(offsetProps) ? offsetProps : [leftOffset, topOffset];
  return {
    offset,
  };
}

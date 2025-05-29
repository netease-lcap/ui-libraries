import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';

export function handleOffset(props) {
  const offset = props.get('offset') ?? '{}';
  const offsetProps = useMemo(() => {
    if (_.isArray(offset) && offset.length === 2) return offset;

    const jsonOffset = _.isString(offset) && !_.isEmpty(offset) ? _.attempt(JSON.parse, offset) : undefined;

    return _.isArray(jsonOffset) && jsonOffset.length === 2 ? jsonOffset : undefined;
  }, [offset]);

  return { offset: offsetProps };
}

import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';

export function basicPlugin(props) {
  const pageSizesProps = props.get('pageSizes');
  const pageSizes = useMemo(() => {
    const jsonPageSizes = _.attempt(JSON.parse, pageSizesProps);
    return _.isArray(jsonPageSizes) ? jsonPageSizes : [10, 20, 50];
  }, [pageSizesProps]);
  return {
    pageSizes,
  };
}

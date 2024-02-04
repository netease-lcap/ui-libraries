import {
  $labelKey, $valueKey, $dataSourceField, $deletePropsList,
} from '@/plugins/constants';

export function useHandleTransform(props) {
  return {
    [$deletePropsList]: props.get($deletePropsList, []).concat(['loading', 'dataSource']),
    [$dataSourceField]: 'items',
    [$labelKey]: 'label',
    [$valueKey]: 'key',
  };
}

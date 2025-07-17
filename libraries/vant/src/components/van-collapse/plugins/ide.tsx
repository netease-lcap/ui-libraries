import { $ide } from '@/plugins/constants';

export function handleModelValueInIde(props) {
  const dataSource = props.get('dataSource');
  if (dataSource) {
    return {
      modelValue: 'opened',
    };
  }
  return {};
}
handleModelValueInIde.type = $ide;

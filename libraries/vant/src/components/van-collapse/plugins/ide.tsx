import { $ide } from '@/plugins/constants';

export function handleModelValueInIde(props) {
  const dataSource = props.get('dataSource');
  const nodePath = props.get('data-nodepath');
  if (dataSource && nodePath) {
    return {
      modelValue: 'opened',
    };
  }
  return {};
}
handleModelValueInIde.type = $ide;

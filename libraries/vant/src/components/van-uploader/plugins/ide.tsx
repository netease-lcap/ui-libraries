import { $deletePropsList, $ide } from '@/plugins/constants';

export function handleDeleteNodepath(props) {
  const nodePath = props.get('data-nodepath');
  if (nodePath) {
    const isInForm = props.get('isInForm');
    const deletePropsList = props.get($deletePropsList).concat([isInForm ? 'data-nodepath' : '']);
    return {
      [$deletePropsList]: deletePropsList,
    };
  }
  return {};
}
handleDeleteNodepath.type = $ide;

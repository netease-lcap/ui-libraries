import { $ide } from '@/plugins/constants';

export function handleDataNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const classProps = props.get('class');
  if (nodePath) {
    return {
      class: classProps ? `van-index-anchor--root ${classProps}` : 'van-index-anchor--root',
    };
  }
  return {};
}

handleDataNodePath.type = $ide;

import { uid } from 'uid';

export function handleIndex(props) {
  const index = props.get('index');
  return {
    index: index || uid(),
  };
}

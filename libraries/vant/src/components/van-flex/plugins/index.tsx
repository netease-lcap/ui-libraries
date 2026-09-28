export { handleControllableValue } from '@/plugins/common/index';

export function handleFlex(props) {
  const ref = props.get('ref');
  const myRouter = props.get('myRouter');
  return {
    router: myRouter,
  };
}

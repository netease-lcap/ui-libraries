import _ from 'lodash';

export function handleIndex(props) {
  const index = props.get('index');
  const destination = props.get('destination');
  return {
    index: index || destination || _.uniqueId('el-menu-item-'),
  };
}

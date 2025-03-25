import _ from 'lodash'

export function handleIndex(props) {
  const index = props.get('index');
  return {
    index: index || _.uniqueId('el-menu-item-'),
  };
}

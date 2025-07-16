import _ from 'lodash';
import { getPropsIcon } from '@/plugins/common/icon';

export { handleControllableValue } from '@/plugins/common/index';

 function handleFieldIcons(props) {
  const suffixIcon = props.get('suffixIcon');
  const prefixIcon = props.get('prefixIcon');
  return {
    suffixIcon: getPropsIcon({ name: suffixIcon }),
    prefixIcon: getPropsIcon({ name: prefixIcon }),
  };
}

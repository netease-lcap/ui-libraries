import _ from 'lodash';
import { useCallback } from '@/plugins/hooks';

export { handleControllableValue } from '@/plugins/common/index';
export { handleComponentInForm } from '@/components/van-form/plugins/form-item';

export const handleInput = (props) => {
  const onChangeProp = props.get('onChange', () => {});
  const onInputProp = props.get('onInput', () => {});
  const onInput = useCallback(
    _.wrap(onInputProp, (fn, event) => _.attempt(fn, _.get(event, 'target.value'))),
    [onInputProp],
  );
  const onChange = useCallback(
    _.wrap(onChangeProp, (fn, event) => _.attempt(fn, _.get(event, 'target.value'))),
    [onChangeProp],
  );

  return {
    onInput,
    onChange,
  };
};

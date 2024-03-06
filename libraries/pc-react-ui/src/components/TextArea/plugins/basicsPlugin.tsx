import _ from 'lodash';

export function useHandle() {
  return {};
}
export function useHandleRef(props) {
  const onChangeProps = props.get('onChange');
  const result = {
    onChange: _.wrap(onChangeProps, (fn, e) => {
      fn(e?.target?.value, e);
    }),
  };
  return _.isFunction(onChangeProps) ? result : {};
}

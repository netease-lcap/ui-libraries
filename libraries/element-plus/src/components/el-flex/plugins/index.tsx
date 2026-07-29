import _ from 'lodash';

export function name(props) {
  const classNameProps = props.get('class') ?? '';
  const mode = props.get('mode');
  const modeClass = mode === 'form-flex' ? 'el-form-flex' : '';
  const className = _.mergeClass(classNameProps, modeClass);
  return {
    class: className,
  };
}

// export * from './button';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
// export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export function handleTextToslot(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat(['text']);
  return {
    slots: _.defaults(slots, {
      default: () => text,
    }),
    [$deletePropsList]: deletePropsList,
  };
}

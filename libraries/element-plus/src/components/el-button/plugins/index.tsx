// export * from './button';
import _ from 'lodash';
import { ElPopconfirm } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { PopconfirmAttrsMap } from '../constants';
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

export function handlePopupconfirmButton(props) {
  const ButtonComponent = props.get('render');
  const isOpenConfirm = props.get('isOpenConfirm');
  const onClick = props.get('onClick');
  const slots = props.get('slots');
  if (!isOpenConfirm) return {};

  const title = props.get('popconfirmTitle') || '确认操作？';
  const confirmButtonText = props.get('popconfirmConfirmButtonText') || '确认';
  const cancelButtonText = props.get('popconfirmCancelButtonText') || '取消';

  const getReferenceButton = (selfProps) => {
    return (
      <ButtonComponent
        {..._.omit(selfProps, [..._.keys(PopconfirmAttrsMap), 'text', 'onClick'])}
        v-slots={{
          default: () => slots.default?.(),
        }}
      />
    );
  };

  const render = (selfProps) => {
    const confirmProps = _.mapKeys(
      _.pick(selfProps, _.keys(PopconfirmAttrsMap)),
      (_, key) => PopconfirmAttrsMap[key],
    );

    return (
      <ElPopconfirm
        {...confirmProps}
        title={title}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        onConfirm={onClick}
      >
        {{
          reference: () => getReferenceButton(selfProps),
        }}
      </ElPopconfirm>
    );
  };

  render.inheritAttrs = false;
  return {
    render,
  };
}

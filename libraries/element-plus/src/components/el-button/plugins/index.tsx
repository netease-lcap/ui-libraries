// export * from './button';
import _ from 'lodash';
import { ElPopconfirm } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { $PopconfirmProps } from '../constants';
import { useCallback } from '@/plugins/hooks';
// export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export function handleTextToslot(props) {
  const text = props.get('text');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList).concat(['text']);
  const defaultSlot = text ? { default: () => text } : {};
  return {
    slots: _.assign(slots, defaultSlot),
    [$deletePropsList]: deletePropsList,
  };
}

export function handlePopupconfirmButton(props) {
  const ButtonComponent = props.get('render');
  const isPopConfirm = props.get('isPopConfirm');
  const slots = props.get('slots');

  const getReferenceButton = useCallback(
    (selfProps) => {
      return (
        <ButtonComponent
          {..._.omit(selfProps, [...$PopconfirmProps, 'onClick', 'isPopConfirm'])}
          v-slots={{
            default: () => slots.default?.(),
          }}
        />
      );
    },
    [slots],
  );

  const render = useCallback((selfProps, { attrs }) => {
    return (
      <ElPopconfirm
        {..._.pick(selfProps, $PopconfirmProps)}
        title={selfProps.popconfirmTitle ?? '确认操作？'}
        icon={selfProps.popconfirmIcon}
        confirmButtonText={selfProps.confirmButtonText ?? '确认'}
        cancelButtonText={selfProps.cancelButtonText ?? '取消'}
        onConfirm={selfProps.onClick}
      >
        {{
          reference: () => getReferenceButton({ ...selfProps, ...attrs }),
        }}
      </ElPopconfirm>
    );
  }, []);

  render.inheritAttrs = false;
  const result = isPopConfirm ? { render } : {};

  return result;
}

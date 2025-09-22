// export * from './button';
import _ from 'lodash';
import { ElPopconfirm, buttonProps } from 'element-plus';
import { VNode } from 'vue';

import { $deletePropsList } from '@/plugins/constants';
import { $PopconfirmProps } from '../constants';
import { getPropsIcon } from '@/plugins/common/icon';
import { useCallback } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
// export { handleComponentInForm } from '@/components/el-form/plugins/form-item';

// 定义带有 inheritAttrs 属性的渲染函数类型
type RenderFunctionWithInheritAttrs = ((selfProps: any, context: { attrs: any }) => VNode) & {
  inheritAttrs?: boolean;
};

const ButtonAccumulate = new PluginAccumulateTypes<nasl.ui.ElButtonOptions, typeof buttonProps>();

export default ButtonAccumulate.addPlugin({
  name: 'handleTextToslot',
  handle: (props) => {
    const text = props.get('text');
    const slots = props.get('slots');
    const icon = props.get('icon');
    const deletePropsList = props.get($deletePropsList).concat([_.isString(text) ? 'text' : '']);
    const defaultSlot = _.isString(text) ? { default: () => text } : {};
    return {
      slots: _.assign({}, slots, defaultSlot),
      [$deletePropsList]: deletePropsList,
      icon: getPropsIcon({ name: icon }),
    };
  },
})
  .addPlugin({
    name: 'handlePopupconfirmButton',
    handle: (props) => {
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
            title={selfProps.title ?? '确认操作？'}
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
      }, []) as RenderFunctionWithInheritAttrs;

      render.inheritAttrs = false;
      const result = isPopConfirm ? { render } : {};

      return result;
    },
  })
  .addPlugin({
    name: 'handleRightIcon',
    handle: (props) => {
      const rightIcon = props.get('rightIcon');
      if (!rightIcon) return {};
      const slots = props.get('slots');
      return {
        slots: _.assign({}, slots, {
          default: () => [slots.default?.(), getPropsIcon({ name: rightIcon, class: 'el-button__right-icon' })],
        }),
      };
    },
  })
  .addPlugin({
    name: 'handleThrottleTime',
    handle: (props) => {
      const throttleTime = props.get('throttleTime');
      const onClick = props.get('onClick', () => {});
      if (!throttleTime) return {};
      return {
        onClick: _.throttle(onClick, throttleTime),
      };
    },
  });

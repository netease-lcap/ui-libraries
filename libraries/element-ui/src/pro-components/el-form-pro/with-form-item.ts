
import Vue, { ComponentOptions } from 'vue';
import { type ScopedSlot } from 'vue/types/vnode';
import { IN_ELEMENT_FORM } from './constants';
import { isModelOption, isRangeModelOption } from './utils';

export const FormItemProps = [
  'name',
  'initialValue',
  'useRangeValue',
  'startFieldName',
  'endFieldName',
  'startInitialValue',
  'endInitialValue',
  'colSpan',
  'help',
  'helpIsSlot',
  'labelAlign',
  'labelWidthType',
  'labelWidth',
  'labelEllipsis',
  'requiredMark',
  'rules',
  'disableValidate',
  'showErrorMessage',
  'statusIcon',
  'successBorder',
];

export const FormItemSlots = [
  'help',
  'label',
];

export const FormItemMethods: string[] = [];
export const FormItemEvents: string[] = [];

function getAttrs(attrs: Record<string, any>) {
  const inputAttrs = {
    ...attrs,
  };

  const formItemAttrs = {};

  Object.keys(inputAttrs).forEach((name) => {
    if (FormItemProps.includes(name) || name.startsWith('data-')) {
      formItemAttrs[name] = inputAttrs[name];
      delete inputAttrs[name];
    }
  });

  return {
    input: inputAttrs,
    formItem: formItemAttrs,
  };
};

function getListeners(listeners: Record<string, Function>) {
  const inputListeners = {
    ...listeners,
  };

  const formItemListeners = {};

  Object.keys(inputListeners).forEach((name) => {
    if (FormItemEvents.includes(name) || name.startsWith('data-')) {
      formItemListeners[name] = inputListeners[name];
      delete inputListeners[name];
    }
  });

  return {
    input: inputListeners,
    formItem: formItemListeners,
  };
};

function getSlots(slots: Record<string, ScopedSlot>) {
  const inputSlots = {
    ...slots,
  };

  const formItemSlots = {};

  Object.keys(inputSlots).forEach((name) => {
    if (FormItemSlots.includes(name) || name.startsWith('data-')) {
      formItemSlots[name] = inputSlots[name];
      delete inputSlots[name];
    }
  });

  return {
    input: inputSlots,
    formItem: formItemSlots,
  };
}

export interface WithFormItemOptions {
  name: string;
  methodNames?: string[];
}

export const WithFormItem = (Component: any, { name, methodNames = [] }: WithFormItemOptions) => {
  if (!isModelOption(Component) && !isRangeModelOption(Component)) {
    console.warn('该组件不是表单类组件，未配置 v-model');
    return Component;
  }

  return {
    name,
    inheritAttrs: false,
    inject: {
      inForm: {
        from: IN_ELEMENT_FORM,
        default: false,
      }
    },
    created() {
      const ctx = this as any;
      methodNames.forEach((key) => {
        Object.defineProperty(ctx, key, {
          configurable: true,
          get() {
            if (!ctx.$refs.formInput) {
              return undefined;
            }
            return ctx.$refs.formInput[key];
          },
        });
      });

      if (ctx.inForm) {
        FormItemMethods.forEach((key) => {
          Object.defineProperty(ctx, key, {
            configurable: true,
            get() {
              if (!ctx.$refs.formItem) {
                return undefined;
              }
              return ctx.$refs.formItem[key];
            },
          });
        });
      }
    },
    render(h) {
      const { $attrs, $listeners, $scopedSlots, inForm } = this as any;
      const attrs = getAttrs($attrs);
      const listeners = getListeners($listeners);
      const slots = getSlots($scopedSlots);

      const inputElement = h(Component, {
        attrs: attrs.input,
        on: listeners.input,
        ref: 'formInput',
        scopedSlots: slots.input,
      });

      if (!inForm) {
        return inputElement;
      }

      return h('el-form-item-pro', {
        attrs: attrs.formItem,
        on: listeners.formItem,
        scopedSlots: slots.formItem,
        ref: 'formItem',
      }, [
        inputElement,
      ]);
    },
  } as ComponentOptions<Vue>;
};

import Vue, { ComponentOptions } from 'vue';
import { type ScopedSlot } from 'vue/types/vnode';
import { camelCase } from 'lodash';
import { IN_ELEMENT_FORM, IN_ELEMENT_FORM_ITEM } from './constants';
import { isModelOption, isRangeModelOption } from './utils';
import { getVarMapAndClass } from '@/utils/style';

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
  'hiddenLabel',
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
  const inputAttrs: Record<string, any> = {
    ...attrs,
  };

  const rootAttrs: Record<string, any> = {};

  const formItemAttrs: Record<string, any> = {};

  Object.keys(inputAttrs).forEach((name) => {
    if (name.startsWith('data-')) {
      rootAttrs[name] = inputAttrs[name];
      delete inputAttrs[name];
    } else if (FormItemProps.includes(name)) {
      formItemAttrs[name] = inputAttrs[name];
      delete inputAttrs[name];
    }
  });

  return {
    root: rootAttrs,
    input: inputAttrs,
    formItem: formItemAttrs,
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function getListeners(listeners: Record<string, Function>) {
  const inputListeners = {
    ...listeners,
  };

  const formItemListeners = {};

  Object.keys(inputListeners).forEach((name) => {
    if (FormItemEvents.includes(name)) {
      formItemListeners[name] = inputListeners[name];
      delete inputListeners[name];
    }
  });

  return {
    input: inputListeners,
    formItem: formItemListeners,
  };
}

function getSlots(slots: Record<string, ScopedSlot>) {
  const inputSlots = {
    ...slots,
  };

  const formItemSlots = {};

  Object.keys(inputSlots).forEach((name) => {
    if (FormItemSlots.includes(name)) {
      formItemSlots[name] = inputSlots[name];
      delete inputSlots[name];
    }
  });

  return {
    input: inputSlots,
    formItem: formItemSlots,
  };
}

function getStyles(style: Record<string, string> = {}) {
  const rootStyle = {};
  const inputStyle = {};
  Object.keys(style).forEach((key) => {
    const attrName = camelCase(key);
    if (
      [
        'margin', 'marginLeft', 'marginRight', 'marginBottom', 'marginTop',
        'position', 'left', 'right', 'bottom', 'top',
        'display', 'flex', 'order', 'visibility', 'zIndex', 'boxSizing',
        'flexGrow', 'flexShrink', 'flexBasis', 'alignSelf',
      ].includes(attrName)
    ) {
      rootStyle[key] = style[key];
    } else {
      inputStyle[key] = style[key];
    }
  });
  return { rootStyle, inputStyle };
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
      },
      inFormItem: {
        from: IN_ELEMENT_FORM_ITEM,
        default: false,
      },
    },
    props: {
      inputStyle: {
        type: Object,
      },
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
      const {
        $attrs,
        $listeners,
        $scopedSlots,
        inForm,
        inFormItem,
        inputStyle,
      } = this as any;
      const attrs = getAttrs($attrs);
      const listeners = getListeners($listeners);
      const slots = getSlots($scopedSlots);
      const inputRoot = !inForm || inFormItem;
      const { varMap, classList } = getVarMapAndClass(inputStyle);
      const { rootStyle, inputStyle: eleStyle } = getStyles(inputStyle);

      const inputElement = h(Component, {
        attrs: {
          ...attrs.input,
          ...(inputRoot ? attrs.root : {}),
        },
        staticStyle: {
          ...(inputRoot ? inputStyle : eleStyle),
          ...varMap,
        },
        class: [...classList, '__cw-form-compose-input'].join(' '),
        on: listeners.input,
        ref: 'formInput',
        scopedSlots: slots.input,
      });

      if (inputRoot) {
        return inputElement;
      }

      return h('el-form-item-pro', {
        attrs: {
          ...attrs.formItem,
          ...attrs.root,
        },
        style: {
          ...rootStyle,
        },
        on: listeners.formItem,
        scopedSlots: slots.formItem,
        ref: 'formItem',
      }, [
        inputElement,
      ]);
    },
  } as ComponentOptions<Vue>;
};

import _, {
  get as lodashGet,
  isFunction,
  isNil,
  isArray,
} from 'lodash';
import { type VNode } from 'vue';
import { computed, unref } from '@vue/composition-api';
import { createUseUpdateSync, NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { Tag, SelectValue, SelectValueChangeTrigger, PopupProps } from '@element-pro';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';

export const useUpdateSync = createUseUpdateSync();

export const useSelect: NaslComponentPluginOptions = {
  props: ['valueField', 'labelField', 'data', 'multiple', 'optionIsSlot', 'valueIsSlot'],
  setup(props, { h }) {
    const valueField = props.useComputed('valueField', (v) => v || 'value');
    const textField = props.useComputed('textField', (v) => v || 'text');

    const options = props.useComputed(['data', 'textField', 'optionIsSlot'], (data: any[], textKey: string, optionIsSlot: boolean) => {
      if (_.isEmpty(data)) {
        return undefined;
      }

      if (!optionIsSlot) {
        return data;
      }

      return data.map((item, i) => {
        return {
          ...item,
          content: () => {
            const slotOption = props.get('slotOption');
            let vnodes;
            if (isFunction(slotOption)) {
              vnodes = slotOption({
                item,
                index: i,
              });
            }

            if (isEmptyVNodes(vnodes)) {
              return lodashGet(item, textKey || 'text');
            }

            return vnodes;
          },
        };
      });
    });

    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));

    const disabled = computed(() => {
      const isPropDisabled = props.useComputed('disabled', (v) => v || false).value;
      const isEmptyDisabled = props.useComputed('emptyDisabled', (v) => v || false).value;
      const hasOptions = options.value && options.value.length > 0;
      return isPropDisabled || (isEmptyDisabled && !hasOptions);
    });

    return {
      options,
      disabled,
      slotValueDisplay: ({ value, onClose }) => {
        const slotValue = props.get<(c: any) => VNode[]>('slotValue');
        const [
          multiple, valueIsSlot,
          disabled, readonly,
          minCollapsedNum,
        ] = props.get<[boolean, boolean, boolean, boolean, number]>(['multiple', 'valueIsSlot', 'disabled', 'readonly', 'minCollapsedNum']);
        const optionList = unref(options);

        if (!slotValue || !optionList || !valueIsSlot) {
          return null;
        }

        if (!multiple) {
          const item = optionList.find((it) => !isNil(value) && (it === value || lodashGet(it, unref(valueField)) === value));

          if (!item) {
            return null;
          }

          return slotValue({ item });
        }

        const selectedList = isArray(value) ? value : [];
        let items = optionList.filter((it) => selectedList.findIndex(((s) => s.value === it || lodashGet(it, unref(valueField)) === s.value)) !== -1);

        if (items.length === 0) {
          return null;
        }

        if (minCollapsedNum > 0) {
          items = items.slice(0, minCollapsedNum);
        }

        return items.map((item, index) => (
          h(Tag, {
            key: index,
            attrs: {
              disabled,
              onClose: (context: { e: MouseEvent }) => onClose({ e: context.e, index }),
              closable: !readonly && !disabled,
            },
          }, slotValue({ item }) || [lodashGet(item, textField.value)])
        ));
      },
      onChange: (value: SelectValue, context: { option?: any; selectedOptions: any[]; trigger: SelectValueChangeTrigger; }) => {
        const onChange = props.get('onChange');

        if (_.isFunction(onChange)) {
          onChange({
            value,
            option: context.option,
            selectedOptions: context.selectedOptions,
            trigger: context.trigger,
          });
        }
      },
      keys: computed(() => {
        return {
          value: valueField.value,
          label: textField.value,
          ...keys.value,
        };
      }),
    };
  },
};

export const usePopupProps = {
  setup(props) {
    const appendTo = props.useComputed('appendTo', (v) => v || 'body').value;

    return {
      popupProps: props.useComputed('popupProps', (popupProps = {}) => {
        return {
          attach: appendTo === 'reference' ? (node) => node : 'body',
          ...popupProps,
        } as PopupProps;
      }),
    };
  },
};

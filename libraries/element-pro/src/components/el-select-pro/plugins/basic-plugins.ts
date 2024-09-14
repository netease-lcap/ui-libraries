import _ from 'lodash';

import { createUseUpdateSync } from '@lcap/vue2-utils';
import { SelectValue, SelectValueChangeTrigger } from '@element-pro';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';

export const useUpdateSync = createUseUpdateSync();

export const useSelect = {
  props: ['valueField', 'labelField', 'data'],
  setup(props, ctx) {
    const valueField = props.useComputed('valueField', (v) => v || 'value');
    const textField = props.useComputed('textField', (v) => v || 'label');

    const options = props.useComputed('data', (v) => (_.isEmpty(v) ? undefined : v));
    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));

    return {
      options,
      // slotDefault: () => null,
      //  $render(ctx.slots.default),
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
      keys: {
        value: valueField.value,
        label: textField.value,
        ...keys.value,
      },
    };
  },
};

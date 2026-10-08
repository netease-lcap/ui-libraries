import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { useMemo } from '@/plugins/hooks';

export function convertVanFormItemRules(rulesProps) {
  const list = _.isString(rulesProps) ? [{ validate: rulesProps, required: true }] : rulesProps ?? [];
  return (
    _.map(list, (item) => {
      if (!item?.validate) return item;

      const validate = _.isFunction(item.validate)
        ? _.wrap(item.validate, async (fn, ...args) => {
            const result = await fn(...args);
            const errorMessage = result?.errorMsg;
            if (errorMessage) throw new Error(errorMessage);
            if (!result && _.isString(item.message)) throw new Error(item.message);
            return result;
          })
        : item.validate;

      const validator = new (VusionValidator as any)(undefined, localizeRules, [_.assign({}, item, { validate })]);
      return {
        message: item.message,
        required: item.required,
        validator: async (value) => {
          const result = await new Promise((resolve) => {
            validator
              .validate(_.get(value, 'value', value))
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                resolve(false);
              });
          });
          return result;
        },
      };
    }) ?? []
  );
}

export function handlePropName(props) {
  const nameProps = props.get('name');
  const uniqueId = useMemo(() => _.uniqueId('formItemPropName'), []);
  const name = useMemo(() => nameProps ?? uniqueId, [nameProps]);
  return { name };
}

export function handleSlotToInputSlot(props) {
  const labelProps = props.get('label');
  const label = useMemo(() => labelProps ?? '', [labelProps]);
  return { label };
}

export function handleRules(props) {
  const rulesProps = props.get('rules') ?? [];

  const rules = useMemo(() => convertVanFormItemRules(rulesProps), [rulesProps]);
  return { rules };
}

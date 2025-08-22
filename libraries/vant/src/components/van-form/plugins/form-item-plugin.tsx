import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { useMemo } from '@/plugins/hooks';

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

  const rules = useMemo(() => {
    const ideRules = _.map(rulesProps, (item) => ({
        message: item.message,
        required: item.required,
        validator: async (value, rule, callback) => {
          const validator = new (VusionValidator as any)(undefined, localizeRules, [item]);
          const result = await new Promise((resolve) => {
            validator
              .validate(_.get(value, 'value', value))
              .then(() => {
                resolve(true);
              })
              .catch((errorMessage) => {
                resolve(false);
              });
          });
          return result;
        },
      })) ?? [];
    return ideRules;
  }, [rulesProps]);
  return { rules };
}

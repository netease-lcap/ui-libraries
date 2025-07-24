import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { useMemo } from '@/plugins/hooks';

export function handlePropName(props) {
  const propProps = props.get('prop');
  const uniqueId = useMemo(() => _.uniqueId('formItemPropName'), []);
  const prop = useMemo(() => propProps ?? uniqueId, [propProps]);
  return { prop };
}

export function handleRules(props) {
  const rulesProps = props.get('rules') ?? [];
  const isRequired = props.get('isRequired');
  const required = useMemo(
    () => (isRequired ? { required: true, message: '表单项不得为空', trigger: 'blur' } : []),
    [isRequired],
  );
  const rules = useMemo(() => {
    const ideRules = _.map(rulesProps, (item) => ({
        message: item.message,
        required: item.required,
        trigger: ['blur'],
        validator: (rule, value, callback) => new Promise((resolve) => {
            const validator = new (VusionValidator as any)(undefined, localizeRules, [item]);
            validator
              .validate(value)
              .then(() => {
                resolve(true);
              })
              .catch((errorMessage) => {
                callback(new Error(errorMessage));
                resolve({
                  result: false,
                  message: errorMessage,
                });
              });
          }),
      })) ?? [];
    return ideRules.concat(required);
  }, [rulesProps]);
  return { rules };
}

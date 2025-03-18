import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { useMemo } from '@/plugins/hooks';
import { $rootStyle } from '@/plugins/constants';

export function handlePropName(props) {
  const propProps = props.get('prop');
  const uniqueId = useMemo(() => _.uniqueId('formItemPropName'), []);
  const prop = useMemo(() => propProps ?? uniqueId, [propProps]);
  return prop;
}

function categoryStyles(style: Record<string, string> = {}) {
  return Object.entries(style).reduce(
    (acc, [key, value]) => {
      const styleKey = $rootStyle.includes(key) ? 'style' : 'innerStyle';
      acc[styleKey][key] = value;
      return acc;
    },
    { style: {}, innerStyle: {} },
  );
}
export function handleInputStyle(props) {
  const styleProps = props.get('style');
  const { style, innerStyle } = categoryStyles(styleProps);
  return { style, innerStyle };
}

export function handleIsRequired(props) {
  const isRequiredProps = props.get('isRequired');
  const isRequired = useMemo(() => isRequiredProps ?? false, [isRequiredProps]);
  return isRequired;
}

export function handleRules(props) {
  const rulesProps = props.get('rules');
  const rules = useMemo(() => {
    return rulesProps.map((item) => ({
      message: item.message,
      required: item.required,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        const validator = new (VusionValidator as any)(undefined, localizeRules, [item]);
        return new Promise((resolve) => {
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
        });
      },
    }));
  }, [rulesProps]);
  return rules;
}

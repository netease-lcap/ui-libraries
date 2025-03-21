import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { ElFormItem } from 'element-plus';
import { useMemo, useControllableValue } from '@/plugins/hooks';
import { $rootStyle } from '@/plugins/constants';
import { $formProvide } from '@/components/el-form/constants';

export function handlePropName(props) {
  const propProps = props.get('prop');
  const uniqueId = useMemo(() => _.uniqueId('formItemPropName'), []);
  const prop = useMemo(() => propProps ?? uniqueId, [propProps]);
  return { prop };
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
  return { isRequired };
}
handleIsRequired.order = 3;

export function handleRules(props) {
  const rulesProps = props.get('rules');
  const isRequired = props.get('isRequired');
  const required = useMemo(() => (isRequired ? { required: true, message: '表单项不得为空', trigger: 'blur' } : []), [isRequired]);
  const rules = useMemo(
    () => rulesProps
        .map((item) => ({
          message: item.message,
          required: item.required,
          trigger: 'blur',
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
        }))
        .concat(required),
    [rulesProps],
  );
  return { rules };
}

export function handleFormItem(props) {
  const formItemProps = useMemo(() => Object.keys(ElFormItem.props), []);
  const slots = props.get('slots');
  const prop = props.get('prop');
  const defaultSlotNode = slots.default();
  const injectProps = props.get('inject');
  const inject = injectProps?.value?.[$formProvide] ?? {};
  const { isInForm } = inject;
  const [model, setModel] = useControllableValue(props, {
    onChange: (value) => {
      inject.setValue(prop, value);
    },
  });

  // return { formItemProps };
}

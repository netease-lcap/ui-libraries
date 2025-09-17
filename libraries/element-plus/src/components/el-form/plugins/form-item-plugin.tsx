import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { FormItemProps } from 'element-plus';
import { useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const FormItemPluginAccumulate = new PluginAccumulateTypes<nasl.ui.ElFormItemProOptions, FormItemProps>();
export default FormItemPluginAccumulate.addPlugin({
  name: 'handlePropName',
  handle(props) {
    const propProps = props.get('prop');
    const uniqueId = useMemo(() => _.uniqueId('formItemPropName'), []);
    const prop = useMemo(() => propProps ?? uniqueId, [propProps]);
    return { prop };
  },
}).addPlugin({
  name: 'handleRules',
  handle(props) {
    const rulesProps = props.get('rules') ?? [];
    const isRequired = props.get('isRequired');
    const required = useMemo(
      () => (isRequired ? { required: true, message: '表单项不得为空', trigger: 'blur' } : []),
      [isRequired],
    );
    const rules = useMemo(() => {
      const ideRules = _.map(rulesProps, (item: any) => ({
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
      return [...ideRules, ...(Array.isArray(required) ? required : [required])];
    }, [rulesProps]);
    return { rules };
  },
});

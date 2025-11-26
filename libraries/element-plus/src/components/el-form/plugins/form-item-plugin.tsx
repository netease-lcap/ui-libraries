import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { FormItemProps, Callback } from 'element-plus';
import { useMemo } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import Message from '../../el-message/index';

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
    const trigger = props.get('trigger') ?? 'blur';
    const ignoreRules = props.get('ignoreRules') ?? false;
    const isRequired = props.get('isRequired');
    const required = useMemo(
      () => (isRequired ? { required: true, message: '表单项不得为空', trigger } : []),
      [isRequired],
    );

    const rules = useMemo(() => {
      if (ignoreRules) return [];
      const ideRules = _.map(rulesProps, (item: any) => {
          if (!item.validate) return item;

          const validate = _.isFunction(item.validate)
            ? _.wrap(item.validate, async (fn, ...args) => {
                const result = await fn(...args);
                const errorMessage = result?.errorMsg;
                if (errorMessage) throw new Error(errorMessage);
                if (!result && _.isString(item.message)) throw new Error(item.message);
                return result;
              })
            : item.validate;

          const validator = new (VusionValidator as any)(undefined, localizeRules, [_.assign(item, { validate })]);
          return {
            // message: item.message,
            required: item.required,
            trigger: _.isString(item.trigger) ? item.trigger.split('+') : [trigger],
            validator: (rule, value, callback) => {
              return new Promise((resolve) => {
                validator
                  .validate(value)
                  .then(() => {
                    resolve(true);
                  })
                  .catch((errorMessage) => {
                    callback(errorMessage);
                    resolve({
                      result: false,
                      message: errorMessage,
                    });
                  });
              });
            },
          };
        }) ?? [];
      return [...ideRules, ...(Array.isArray(required) ? required : [required])];
    }, [rulesProps, trigger, ignoreRules]);
    return { rules };
  },
});

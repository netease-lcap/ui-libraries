import _ from 'lodash';
import { FormItemProps } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { addClass } from '@/utils';
import { useMemo, useCallback, useState, useEffect } from '@/plugins/hooks';
import { $formProvide } from '@/components/el-form/constants';
import FormItemPluginAccumulate, { convertFormItemRules } from '@/components/el-form/plugins/form-item-plugin';

const FormItemGroupAccumulate = new PluginAccumulateTypes<nasl.ui.ElFormItemGroupOptions, FormItemProps>();

const VALIDATE_DELETE_PROPS = [
  'validatingValue',
  'validatingProcess',
  'errorTipType',
  'muted',
  'ignoreValidation',
] as const;

type ErrorTipType = 'textAndStatus' | 'statusOnly' | 'textAndBorder';

function resolveErrorTipType(raw: unknown): ErrorTipType {
  if (raw === 'statusOnly' || raw === 'textAndBorder' || raw === 'textAndStatus') return raw;
  if (raw === 'message') return 'statusOnly';
  return 'textAndStatus';
}

function resolveValidateMessage(error: unknown, fallback = '校验失败') {
  if (_.isError(error)) return error.message || fallback;
  if (_.isString(error) && error) return error;
  return String(error ?? fallback);
}

function execNativeRules(rules: any[], value: any) {
  return (rules ?? []).reduce((promise, rule) => {
    return promise.then(() => {
      if (!rule?.validator) {
        if (rule?.required && (value === undefined || value === null || value === '')) {
          return Promise.reject(new Error(rule.message || '表单项不得为空'));
        }
        return undefined;
      }
      return new Promise((resolve, reject) => {
        let settled = false;
        const done = (err?: unknown) => {
          if (settled) return;
          settled = true;
          if (err) reject(err instanceof Error ? err : new Error(resolveValidateMessage(err)));
          else resolve(true);
        };
        try {
          const result = rule.validator(rule, value, done);
          if (result && typeof result.then === 'function') {
            result.then((r) => {
              if (r === false || r?.result === false) {
                done(r?.message || rule.message || '校验失败');
                return;
              }
              done();
            }, done);
          }
        } catch (err) {
          done(err);
        }
      });
    });
  }, Promise.resolve());
}

export default FormItemGroupAccumulate.addPlugin({
  name: 'handleFormItemGroupLayout',
  handle(props) {
    const columnsProp = props.get('columns') ?? 1;
    const columns = useMemo(() => {
      const n = Number(columnsProp);
      if (n === 2 || n === 3) return n;
      return 1;
    }, [columnsProp]);

    const inject = props.get('inject');
    const formColumns = Number(inject?.[$formProvide]?.columns);
    const gridColSpan = useMemo(() => {
      if (Number.isFinite(formColumns) && formColumns > 0) {
        return Math.min(columns, formColumns);
      }
      return columns;
    }, [columns, formColumns]);

    const isRequired = props.get('isRequired') ?? false;
    const classNames = props.get('class') ?? '';
    const style = props.get('style') ?? {};
    const slots = props.get('slots') ?? {};
    const deletePropsList = ((props.get($deletePropsList) as unknown as string[]) ?? []).concat([
      'columns',
      'isRequired',
    ]);

    const defaultSlot = useMemo(
      () => () => <div class="el-form-item-group__content">{slots.default?.()}</div>,
      [slots.default],
    );

    return {
      class: addClass(classNames, ['el-form-item-group', `el-form-item-group--span-${columns}`]),
      style: {
        ...(_.isPlainObject(style) ? style : {}),
        '--el-form-item-group-columns': columns,
        '--el-form-item-col-span': gridColSpan,
      },
      required: Boolean(isRequired),
      slots: _.assign({}, slots, {
        default: defaultSlot,
      }),
      [$deletePropsList]: deletePropsList,
    };
  },
})
  .addPlugin(FormItemPluginAccumulate.getPluginMethodByName('handlePropName') as any)
  .addPlugin({
    name: 'handleGroupValidation',
    handle(props) {
      const rulesProps = props.get('rules');
      const trigger = props.get('trigger') ?? 'blur';
      const ignoreValidation = props.get('ignoreValidation') ?? false;
      const validatingValue = props.get('validatingValue');
      const validatingProcess = props.get('validatingProcess');
      const errorTipType = resolveErrorTipType(props.get('errorTipType'));
      const emit = props.get('emit');
      const ref = props.get('ref') ?? {};
      const classNames = props.get('class') ?? '';
      const uniqueId = useMemo(() => _.uniqueId('formItemPropName'), []);
      const prop = props.get('prop') ?? uniqueId;
      const inject = props.get('inject');
      const { setValue } = inject?.[$formProvide] ?? {};

      const [valid, setValid] = useState(true);
      const [error, setError] = useState<string | undefined>(undefined);
      const [validateStatus, setValidateStatus] = useState<'' | 'error' | 'success' | undefined>(undefined);
      const [borderTipMessage, setBorderTipMessage] = useState<boolean | undefined>(undefined);

      const applyErrorTipUI = useCallback(
        (isValid: boolean, message = '') => {
          if (isValid) {
            setError(undefined);
            setValidateStatus(undefined);
            setBorderTipMessage(undefined);
            return;
          }
          const msg = message || '校验失败';
          if (errorTipType === 'statusOnly') {
            setError(undefined);
            setValidateStatus('error');
            setBorderTipMessage(undefined);
            return;
          }
          if (errorTipType === 'textAndBorder') {
            setError(msg);
            setValidateStatus(undefined);
            setBorderTipMessage(true);
            return;
          }
          setError(msg);
          setValidateStatus('error');
          setBorderTipMessage(undefined);
        },
        [errorTipType],
      );

      const rules = useMemo(() => {
        if (ignoreValidation) return [];
        return _.map(convertFormItemRules(rulesProps, trigger), (rule: any) => {
          if (!rule?.validator) return rule;
          const originValidator = rule.validator;
          return {
            ...rule,
            validator: (nativeRule, value, callback) => {
              return Promise.resolve(
                originValidator(nativeRule, value, (err) => {
                  if (err) applyErrorTipUI(false, resolveValidateMessage(err));
                  else applyErrorTipUI(true);
                  callback?.(err);
                }),
              ).then(
                (res) => {
                  if (res === false || res?.result === false) {
                    applyErrorTipUI(false, res?.message || nativeRule?.message);
                  } else {
                    applyErrorTipUI(true);
                  }
                  return res;
                },
                (err) => {
                  applyErrorTipUI(false, resolveValidateMessage(err));
                  throw err;
                },
              );
            },
          };
        });
      }, [rulesProps, trigger, ignoreValidation, applyErrorTipUI]);

      const resolveValue = useCallback(async () => {
        let value = validatingValue;
        if (_.isFunction(validatingProcess)) {
          value = await validatingProcess(value);
        }
        return value;
      }, [validatingValue, validatingProcess]);

      useEffect(() => {
        let cancelled = false;
        (async () => {
          const value = await resolveValue();
          if (!cancelled) setValue?.(prop, value);
        })();
        return () => {
          cancelled = true;
        };
      }, [resolveValue, prop, setValue]);

      const validated = async () => {
        const value = await resolveValue();
        setValue?.(prop, value);
        if (ignoreValidation) {
          setValid(true);
          applyErrorTipUI(true);
          emit?.('sync:state', 'valid', true);
          return { valid: true };
        }
        try {
          if (typeof ref.validate === 'function') {
            await ref.validate();
          } else {
            await execNativeRules(rules, value);
          }
          setValid(true);
          applyErrorTipUI(true);
          emit?.('sync:state', 'valid', true);
          return { valid: true };
        } catch (errorMessage) {
          const message = resolveValidateMessage(errorMessage);
          setValid(false);
          applyErrorTipUI(false, message);
          emit?.('sync:state', 'valid', false);
          return { valid: false };
        }
      };

      useEffect(() => {
        emit?.('sync:state', 'valid', valid);
      }, [valid]);

      const deletePropsList = ((props.get($deletePropsList) as unknown as string[]) ?? []).concat([
        ...VALIDATE_DELETE_PROPS,
      ]);

      const showErrorBorder = errorTipType === 'textAndBorder' && Boolean(borderTipMessage);

      return {
        prop,
        rules,
        error,
        validated,
        validateStatus,
        showMessage: errorTipType !== 'statusOnly',
        class: addClass(classNames, showErrorBorder ? 'el-form-item-group--error-border' : ''),
        ref: Object.assign(ref, {
          validated,
          get valid() {
            return valid;
          },
        }),
        [$deletePropsList]: deletePropsList,
      };
    },
  });

import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { FormItemProps } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { addClass } from '@/utils';
import { useMemo, useCallback, useState, useEffect } from '@/plugins/hooks';
import { $formProvide } from '@/components/el-form/constants';

const FormItemGroupAccumulate = new PluginAccumulateTypes<nasl.ui.ElFormItemGroupOptions, FormItemProps>();

/** 布局侧剥离的字段绑定属性；校验由 handleGroupValidation 自行处理，不交给 EP 自动触发 */
const LAYOUT_STRIP_PROPS = ['prop', 'ignoreRules', 'trigger', 'isRequired'] as const;

const VALIDATE_DELETE_PROPS = [
  'validatingValue',
  'validatingProcess',
  'errorTipType',
  'muted',
  'ignoreValidation',
  'rules',
] as const;

type ErrorTipType = 'textAndStatus' | 'statusOnly' | 'textAndBorder';

function resolveErrorTipType(raw: unknown): ErrorTipType {
  if (raw === 'statusOnly' || raw === 'textAndBorder' || raw === 'textAndStatus') return raw;
  // 兼容旧 muted：message → 仅透传状态；all → 按文字与边框静默透传（不展示 UI）已废弃，回退默认
  if (raw === 'message') return 'statusOnly';
  return 'textAndStatus';
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
    // 栅格表单：与 form-item colSpan 一致，超过总列数时撑满整行
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
      ...LAYOUT_STRIP_PROPS,
    ]);

    const defaultSlot = useMemo(
      () => () => <div class="el-form-item-group__content">{slots.default?.()}</div>,
      [slots.default],
    );

    return {
      class: addClass(classNames, ['el-form-item-group', `el-form-item-group--span-${columns}`]),
      style: {
        ...(_.isPlainObject(style) ? style : {}),
        // columns：块级/查询中占用 N 倍表单项宽度（非内部分列）
        '--el-form-item-group-columns': columns,
        // 栅格表单跨列（.el-form-grid 下使用 --el-form-item-col-span）
        '--el-form-item-col-span': gridColSpan,
      },
      // 不参与表单自动字段校验；required 仅控制标签必填 * 号展示
      prop: undefined,
      required: Boolean(isRequired),
      slots: _.assign({}, slots, {
        default: defaultSlot,
      }),
      [$deletePropsList]: deletePropsList,
    };
  },
})
  .addPlugin({
    name: 'handleGroupValidation',
    handle(props) {
      const rulesProps = props.get('rules');
      const ignoreValidation = props.get('ignoreValidation') ?? false;
      const validatingValue = props.get('validatingValue');
      const validatingProcess = props.get('validatingProcess');
      const errorTipType = resolveErrorTipType(props.get('errorTipType'));
      const emit = props.get('emit');
      const ref = props.get('ref') ?? {};
      const classNames = props.get('class') ?? '';
      const slots = props.get('slots') ?? {};

      const [valid, setValid] = useState(true);
      const [error, setError] = useState<string | undefined>(undefined);
      const [validateStatus, setValidateStatus] = useState<'' | 'error' | 'success' | undefined>(undefined);
      /** textAndBorder：不透传 EP 状态时的本地错误文案 */
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
            // 不提示文字 + 透传错误状态
            setError(undefined);
            setValidateStatus('error');
            setBorderTipMessage(undefined);
            return;
          }
          if (errorTipType === 'textAndBorder') {
            // 提示文字 + 不透传错误状态 + 分组错误边框
            setError(msg);
            setValidateStatus(undefined);
            setBorderTipMessage(true);
            return;
          }
          // textAndStatus：提示文字 + 透传错误状态
          setError(msg);
          setValidateStatus('error');
          setBorderTipMessage(undefined);
        },
        [errorTipType],
      );
      const validated = useCallback(async () => {
        if (ignoreValidation) {
          setValid(true);
          applyErrorTipUI(true);
          emit?.('sync:state', 'valid', true);
          return { valid: true };
        }

        let value = validatingValue;
        if (_.isFunction(validatingProcess)) {
          value = await validatingProcess(value);
        }
        const validator = new (VusionValidator as any)(undefined, localizeRules, rulesProps);
        try {
          await validator.validate(value);
          setValid(true);
          applyErrorTipUI(true);
          emit?.('sync:state', 'valid', true);
          return { valid: true };
        } catch (errorMessage) {
          const message = _.isError(errorMessage) ? errorMessage.message : String(errorMessage ?? '校验失败');
          setValid(false);
          applyErrorTipUI(false, message);
          emit?.('sync:state', 'valid', false);
          return { valid: false };
        }
      }, [ignoreValidation, rulesProps, validatingValue, validatingProcess, applyErrorTipUI, emit]);

      useEffect(() => {
        emit?.('sync:state', 'valid', valid);
      }, [valid]);

      const deletePropsList = ((props.get($deletePropsList) as unknown as string[]) ?? []).concat([
        ...VALIDATE_DELETE_PROPS,
      ]);

      const showErrorBorder = errorTipType === 'textAndBorder' && Boolean(borderTipMessage);

      return {
        // 仍不向 EP 注册 rules/prop，避免表单 validate / blur 自动触发；仅手动 validated
        prop: undefined,
        rules: [],
        error,
        validated,
        validateStatus,
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
  })
  .addPlugin({
    name: 'handleGroupValidated',
    handle(props) {
      useEffect(() => {
        const inject = props.get('inject');
        const { isInForm, setItemValidated } = inject?.[$formProvide] ?? {};
        if (!isInForm) return;
        const validated = props.get('validated');
        setItemValidated(() => validated());
      }, []);
      return {};
    },
  });

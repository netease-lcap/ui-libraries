import _ from 'lodash';
import { FormItemProps } from 'element-plus';
import { $deletePropsList } from '@/plugins/constants';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { addClass } from '@/utils';
import { useMemo } from '@/plugins/hooks';

const FormItemGroupAccumulate = new PluginAccumulateTypes<nasl.ui.ElFormItemGroupOptions, FormItemProps>();

/** 去掉数据绑定与校验相关能力；isRequired 仅映射为展示用 required，不参与校验 */
const DATA_VALIDATE_PROPS = ['prop', 'rules', 'ignoreRules', 'trigger', 'isRequired', 'error', 'validateStatus'] as const;

export default FormItemGroupAccumulate.addPlugin({
  name: 'handleFormItemGroupLayout',
  handle(props) {
    const columnsProp = props.get('columns') ?? 1;
    const columns = useMemo(() => {
      const n = Number(columnsProp);
      if (n === 2 || n === 3) return n;
      return 1;
    }, [columnsProp]);

    const isRequired = props.get('isRequired') ?? false;
    const classNames = props.get('class') ?? '';
    const style = props.get('style') ?? {};
    const slots = props.get('slots') ?? {};
    const deletePropsList = ((props.get($deletePropsList) as unknown as string[]) ?? []).concat([
      'columns',
      ...DATA_VALIDATE_PROPS,
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
      },
      // 不参与表单字段校验；required 仅控制标签必填 * 号展示
      prop: undefined,
      rules: [],
      required: Boolean(isRequired),
      slots: _.assign({}, slots, {
        default: defaultSlot,
      }),
      [$deletePropsList]: deletePropsList,
    };
  },
});

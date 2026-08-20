/* eslint-disable no-shadow */
import _ from 'lodash';
import { FormProps } from 'element-plus';
import { $formProvide } from '@/components/el-form/constants';
import { $deletePropsList } from '@/plugins/constants';
import { useRef, useEffect, useCallback, useRender } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
// import { useCallback } from '../../../plugins/hooks';
import { addClass } from '@/utils';
import ElFormQueryLayout from './form-query-layout';

/** 与 NASL / 模板兼容：布尔、字符串、可能存在的 kebab 键 */
function isQueryFormOn(props: { get: (k: string, d?: unknown) => unknown }) {
  const a = props.get('queryForm') ?? props.get('query-form');
  if (a === true || a === 'true' || a === 1 || a === '1') return true;
  if (a === false || a === 'false' || a === 0 || a === '0' || a == null) return false;
  return Boolean(a);
}

const FormBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElFormOptions, FormProps>();

export default FormBasicAccumulate.addPlugin({
  name: 'handleModelValue',
  handle(props) {
    const modelValue = props.get('model') ?? {};
    const onValidate = props.get('onValidate', () => {});
    const model = useRef(modelValue);
    const provide = props.get('provide');
    const ref = props.get('ref');
    const formItemList = useRef({});
    const itemValidatedList = useRef<any>([]);
    const preview = props.get('preview') ?? false;
    const labelWidth = props.get('labelWidth') || 'auto';
    return {
      model,
      provide: Object.assign(provide, {
        [$formProvide]: {
          isInForm: true,
          value: model,
          setValue: (key, value) => {
            model.value[key] = value;
          },
          setFormitem: (key, value) => {
            formItemList.value[key] = value;
          },
          setItemValidated: (value) => {
            itemValidatedList.value.push(value);
          },
          deleteFormitem: (key) => {
            delete formItemList.value[key];
          },
          preview,
          layout: props.get('layout'),
          columns: props.get('columns') ?? 1,
        },
      }),
      ref: Object.assign(ref, {
        validated: async () => {
          _.forEach(Object.entries(formItemList.value), ([key, item]: any) => {
            model.value[key] = item?.getModelValue?.() ?? model.value[key];
          });
          const groupValidated = _.map(itemValidatedList.value, (item) => item?.());
          return ref
            .validate()
            .then(() => Promise.all(groupValidated).then((results) => {
                // 任一分组成员返回 { valid: false } 时走异常分支
                if (_.some(results, (item) => _.has(item, 'valid') && item.valid === false)) {
                  return Promise.reject(results);
                }
                return results;
              }))
            .then(
              () => ({ valid: true }),
              () => ({ valid: false }),
            );
        },
        validateField: async (props) => {
          _.forEach(Object.entries(formItemList.value), ([key, item]: any) => {
            model.value[key] = item?.getModelValue?.() ?? model.value[key];
          });
          return ref.validateField(props).then(
            () => ({ valid: true }),
            () => ({ valid: false }),
          );
        },
        resetForm: () => {
          ref.resetFields();
          _.values(formItemList.value).forEach((item: any) => _.attempt(item.resetField));
        },
      }),
      onValidate: useCallback(
        (prop, isValid, message) => {
          _.attempt(onValidate, { prop, isValid, message });
        },
        [onValidate],
      ),
      labelWidth,
    };
  },
})
  .addPlugin({
    name: 'handleMcp',
    handle: (props) => {
      const refId = props.get('data-ref-id');
      const ref = props.get('ref');
      useEffect(() => {
        if (_.get(window, 'UiLibrariesMcp.subscribe')) {
          _.attempt(
            _.get(window, 'UiLibrariesMcp.subscribe', () => {}),
            'el_form__validate',
            refId,
            () => ref.validated(),
          );
          _.attempt(
            _.get(window, 'UiLibrariesMcp.subscribe', () => {}),
            'el_form__clearValidate',
            refId,
            () => {
              ref?.clearValidate();
            },
          );
        }
        return () => {
          if (_.get(window, 'UiLibrariesMcp.unsubscribe')) {
            _.attempt(
              _.get(window, 'UiLibrariesMcp.unsubscribe', () => {}),
              'el_form__validate',
              refId,
            );
            _.attempt(
              _.get(window, 'UiLibrariesMcp.unsubscribe', () => {}),
              'el_form__clearValidate',
              refId,
            );
          }
        };
      }, []);
      return {};
    },
  })
  .addPlugin({
    name: 'handleLayout',
    handle(props) {
      const layout = props.get('layout');
      const classNames = props.get('class') ?? '';
      const queryForm = isQueryFormOn(props);
      const inline = props.get('inline') ?? false;
      const style = props.get('style') ?? {};
      if (layout === 'block' || queryForm) {
        return {
          class: addClass(classNames, 'el-form-block'),
        };
      }
      if (layout === 'inline') {
        return { inline: true };
      }
      if (layout === 'grid') {
        const columns = props.get('columns') ?? 1;
        const provide = props.get('provide');
        if (provide?.[$formProvide]) {
          provide[$formProvide].layout = 'grid';
          provide[$formProvide].columns = columns;
        }
        return {
          style: {
            ...style,
            '--el-form-columns': columns,
          },
          class: addClass(classNames, 'el-form-grid'),
        };
      }
      if (inline) {
        return { inline: true };
      }
      return {
        class: addClass(classNames, 'el-form-block'),
      };
    },
  })
  .addPlugin({
    name: 'handleQueryForm',
    order: 5,
    handle(props) {
      const baseDel = (props.get($deletePropsList) as unknown as string[]) ?? [];
      const deletePropsList = baseDel.concat('queryForm');
      const queryForm = isQueryFormOn(props);
      // const layout = props.get('layout');
      if (!queryForm) {
        return { [$deletePropsList]: deletePropsList };
      }
      const FormComponent = props.get('render') as any;
      const render = useRender((p, { attrs, slots }) => {
        return (
          <FormComponent
            {..._.assign({}, p, attrs)}
            inline={false}
            v-slots={{
              ..._.omit(slots, ['default', 'actions']),
              default: () => (
                <ElFormQueryLayout
                  v-slots={{
                    default: () => slots.default?.(),
                    actions: () => slots.actions?.(),
                  }}
                />
              ),
            }}
          />
        );
      }, []);
      return {
        render,
        inline: false,
        class: addClass(props.get('class') ?? '', 'el-form--query'),
        [$deletePropsList]: deletePropsList,
      };
    },
  });

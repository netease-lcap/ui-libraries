import VusionValidator, { localizeRules } from '@lcap/validator';
import _ from 'lodash';
import { ElFormItem } from 'element-plus';
import {
  computed, inject, provide, Ref, ref, watch, nextTick,
} from 'vue';
import { $formProvide } from '@/components/el-form/constants';
import { $provide } from '@/plugins/constants';

export function handleRules(props, { useState, useEffect, useMemo }) {
  const propName = useMemo(() => _.uniqueId('formItemPropName'), []);
  const rules = props.get('rules');
  const prop = props.get('prop') ?? propName;
  const inject = props.get('inject');
  const provide = props.get('provide');
  const { value, setValue: setFormValue } = inject?.value?.[$formProvide] ?? {};
  return {
    prop,
    rules: _.map(rules, (item) => {
      return {
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
      };
    }),
    name: 'formItem',
    provide: Object.assign(provide, {
      [$formProvide]: {
        value,
        name: 'formitemname',
        setValue(arg) {
          setFormValue({
            ...value.value,
            [prop]: arg,
          });
        },
      },
    }),
  };
}

function getStyles(style: Record<string, string> = {}) {
  const rootStyle = {};
  const inputStyle = {};
  Object.keys(style).forEach((key) => {
    const attrName = _.camelCase(key);
    if (
      [
        'margin',
        'marginLeft',
        'marginRight',
        'marginBottom',
        'marginTop',
        'position',
        'left',
        'right',
        'bottom',
        'top',
        'display',
        'flex',
        'order',
        'visibility',
        'zIndex',
        'boxSizing',
        'flexGrow',
        'flexShrink',
        'flexBasis',
        'alignSelf',
      ].includes(attrName)
    ) {
      rootStyle[key] = style[key];
    } else {
      inputStyle[key] = style[key];
    }
  });
  return { rootStyle, inputStyle };
}
export function withFormItem(Component, name) {
  return {
    name,
    Component,
    inheritAttrs: false,
    props: { ...Component.props, ...ElFormItem.props },
    setup(props, {
      attrs, slots, emit, expose,
    }) {
      const propName = _.uniqueId('formItemPropName');
      const componentRef = ref({});
      const myRef = ref({});
      const prop = computed(() => props.prop ?? propName);
      const styleProps = computed(() => getStyles(props.inputStyle));
      const rules = computed(() => {
        const rules = props.rules ?? [];
        return rules.map((item) => {
          return {
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
          };
        });
      });
      const myInject = inject($provide) as Ref<{ [$formProvide]: { value: any; setValue: (value: any) => void } }>;
      const formProvide = computed(() => myInject?.value?.[$formProvide] ?? { value: undefined, setValue: () => {} });
      const formItemProps = Object.keys(ElFormItem.props);
      watch(componentRef, (value) => Object.assign(myRef.value, value));
      expose(myRef.value);
      return () => {
        return (
          <ElFormItem
            {..._.pick(props, formItemProps)}
            rules={rules.value}
            prop={prop.value}
            style={styleProps.value.rootStyle}
            v-slots={{
              label: slots.label,
            }}
          >
            <Component
              {..._.omit(props, formItemProps)}
              {...attrs}
              style={styleProps.value.inputStyle}
              onUpdate:modelValue={(value) => {
                formProvide.value.setValue({
                  ...formProvide.value.value,
                  [prop.value]: value,
                });
              }}
              v-slots={slots}
              v-on={emit}
              ref={componentRef}
            />
          </ElFormItem>
        );
      };
    },
  };
}

export function handleComponentInForm(props, { useMemo, useEffect }) {
  const inject = props.get('inject');
  const { isInForm } = inject?.value?.[$formProvide] ?? {};
  const nodePath = props.get('data-nodepath');
  const formTagName = props.get('formTagName');
  useEffect(() => {
    nextTick(() => {
      const isInIDE = isInForm && nodePath;
      if (!isInIDE) return;
      const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
      elem?.setAttribute('data-element-tag', formTagName);
      elem?.setAttribute('data-has-mutation', 'true');
    });
  }, []);
}

handleComponentInForm.order = 6;

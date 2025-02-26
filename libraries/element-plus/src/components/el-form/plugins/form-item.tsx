import VusionValidator, { localizeRules } from '@lcap/validator';
import _ from 'lodash';
import { ElFormItem } from 'element-plus';
import { computed, inject, provide, Ref, ref, watch, nextTick } from 'vue';
import { $formProvide } from '@/components/el-form/constants';
import { $provide } from '@/plugins/constants';
import { useEffect, useMemo, useRef } from '@/plugins/hooks';

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
    setup(props, { attrs, slots, emit, expose }) {
      const propName = _.uniqueId('formItemPropName');
      const componentRef = ref({});
      const myRef = ref({});
      const prop = computed(() => props.prop ?? propName);
      const isRequired = computed(() => attrs.isRequired ?? false);
      const styleProps = computed(() => getStyles(props.inputStyle));
      const rules = computed(() => {
        const rules = props.rules ?? [];
        const required = isRequired.value ? { required: true, message: '表单项不得为空', trigger: 'blur' } : {};
        return rules
          .map((item) => {
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
          })
          .concat(required);
      });
      const myInject = inject($provide) as Ref<{ [$formProvide]: { value: any; setValue: (value: any) => void } }>;
      const formProvide = computed(() => myInject?.value?.[$formProvide] ?? { value: undefined, setValue: () => {} });
      const formItemProps = Object.keys(ElFormItem.props);
      watch(componentRef, (value) => Object.assign(myRef.value, value));
      expose(myRef.value);

      return () => {
        return (
          <ElFormItem
            {..._.pick(props, [
              'error',
              'for',
              'inlineMessage',
              'label',
              'labelPosition',
              'labelWidth',
              'prop',
              // 'required',
              // 'rules',
              'showMessage',
              'size',
              'validateStatus',
            ])}
            prop={prop.value}
            style={styleProps.value.rootStyle}
            v-slots={{
              label: slots.label,
            }}
            rules={rules.value}
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
export function handleComponentInForm(props) {
  const nodePath = props.get('data-nodepath');
  const formTagName = props.get('formTagName');
  useEffect(() => {
    const inject = props.get('inject');
    const { isInForm } = inject?.value?.[$formProvide] ?? {};
    const isInIDE = isInForm && nodePath;
    if (!isInIDE) return;
    const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
    elem?.setAttribute('data-element-tag', formTagName);
    elem?.setAttribute('data-has-mutation', 'true');
  }, []);
}

handleComponentInForm.order = 6;

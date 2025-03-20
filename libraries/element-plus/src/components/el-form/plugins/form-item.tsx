import VusionValidator, { localizeRules } from '@lcap/validator';
import _ from 'lodash';
import { ElFormItem } from 'element-plus';
import { computed, inject, Ref, ref, watch, onMounted, onUnmounted } from 'vue';
import { $formProvide } from '@/components/el-form/constants';
import { $provide } from '@/plugins/constants';
import { useEffect } from '@/plugins/hooks';

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
    props: { ...ElFormItem.props },
    setup(props, { attrs, slots, emit, expose }) {
      const propName = _.uniqueId('formItemPropName');
      const componentRef = ref({});
      const myRef = ref({});
      const prop = computed(() => props.prop ?? propName);
      const isRequired = computed(() => attrs.isRequired ?? false);
      const styleProps = computed(() => getStyles(props.inputStyle));
      const rules = computed(() => {
        const rules = props.rules ?? [];
        const required = isRequired.value ? { required: true, message: '表单项不得为空', trigger: 'blur' } : [];
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
      const myInject = inject($provide) as Ref<{
        [$formProvide]: {
          value: any;
          setValue: (key: any, value: any) => void;
          setFormitem: (key: any, value: any) => void;
          deleteFormitem: (key: any) => void;
        };
      }>;
      const formProvide = computed(() => myInject?.value?.[$formProvide]);
      const formItemProps = Object.keys(ElFormItem.props);
      watch(componentRef, (value) => Object.assign(myRef.value, value));
      expose(myRef.value);
      onMounted(() => {
        _.attempt(formProvide.value.setFormitem, prop.value, myRef.value);
      });
      onUnmounted(() => {
        _.attempt(formProvide.value.deleteFormitem, prop.value);
      });
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
              onUpdate:modelValue={(value) => _.attempt(formProvide.value.setValue, prop.value, value)}
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

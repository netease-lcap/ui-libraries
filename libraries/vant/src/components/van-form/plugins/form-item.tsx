import _ from 'lodash';
import { ref, watch, inject, Ref, getCurrentInstance, VNode, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { VanFormItem } from '@/components/van-form';
import { $formProvide, $formItemProps } from '@/components/van-form/constants';
import { useEffect } from '@/plugins/hooks';
import { categoryStyles } from '@/utils';
import { $provide, $formTagName, $ide } from '@/plugins/constants';

type FormItemProvide = {
  [$formProvide]: {
    value: any;
    setValue: (key: string, value: any) => void;
    isInForm: boolean;
    setFormitem: (key: string, value: any) => void;
    deleteFormitem: (key: string) => void;
    preview: boolean;
  };
};

export function withFormItem(Component, name) {
  return {
    name,
    Component,
    inheritAttrs: false,
    props: {
      ...VanFormItem.props,
      modelValue: { type: [String, Number, Boolean, Object, Array], default: undefined },
      'onUpdate:modelValue': { type: Function, default: undefined },
      name: { type: String, default: undefined },
    },
    setup(props, { attrs, slots, emit, expose }) {
      const componentRef = ref({});
      const myRef = ref({});
      const valueRef = ref({});
      const formItemRef = ref({});
      const uniqueid = _.uniqueId('formItemPropName');
      const propName = computed(() => props.name ?? uniqueid);
      const provide = inject($provide) as Ref<FormItemProvide>;
      const { setValue, value = valueRef, setFormitem, deleteFormitem } = provide?.value?.[$formProvide] ?? {};
      const { vnode } = getCurrentInstance() as { vnode: VNode };
      const isControlled = _.has(vnode, 'props.modelValue');

      const modelValue = computed(() => (isControlled ? props?.modelValue : value?.[propName.value]));
      const style = computed(() => categoryStyles(_.assign({}, props?.style, attrs.style)));
      const onUpdateModelValue = (value) => {
        const propsOnUpdateModelValue = props?.['onUpdate:modelValue'] ?? (() => {});
        _.attempt(propsOnUpdateModelValue, value);
        _.attempt(setValue, propName.value, value);
      };
      onMounted(() => {
        const { isInForm } = provide?.value?.[$formProvide] ?? {};
        if (!isInForm) {
          const nodePath = attrs['data-nodepath'];
          const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
          elem?.setAttribute('data-has-mutation', 'true');
          elem?.setAttribute('data-element-tag', name.replace('van-form-', 'van-'));
        }
      });
      watch(
        () => modelValue.value,
        (value) => {
          _.attempt(setValue, propName.value, value);
        },
        {
          deep: true,
        },
      );
      nextTick(() => {
        Object.assign(myRef.value, formItemRef.value, componentRef.value);
      });

      expose(myRef.value);
      onMounted(() => {
        setFormitem?.(propName.value, {
          resetField: () => {
            onUpdateModelValue(undefined);
            _.attempt(_.get(componentRef, 'value.resetField', () => {}));
          },
          getModelValue: () => {
            return modelValue.value;
          },
        });
        _.attempt(setValue, propName.value, modelValue.value);
      });
      onUnmounted(() => {
        deleteFormitem?.(propName.value);
      });
      return () => {
        return (
          <VanFormItem
            {..._.pick(_.assign({}, props, attrs, { name: propName.value }), $formItemProps)}
            style={style.value.style}
            class={`${name} ${_.get(attrs, 'class', '')}`}
            ref={formItemRef}
            v-slots={{
              label: slots.label,
              input: (
                <Component
                  {..._.omit(_.assign({ [$formTagName]: name }, props, attrs), $formItemProps)}
                  v-slots={_.omit(slots, ['label'])}
                  data-nodepath={attrs['data-nodepath']}
                  style={style.value.innerStyle}
                  v-on={emit}
                  ref={componentRef}
                  modelValue={modelValue.value}
                  onUpdate:modelValue={onUpdateModelValue}
                />
              ),
            }}
          />
        );
      };
    },
  };
}
export function handleComponentInForm(props) {
  const nodePath = props.get('data-nodepath');
  const formTagName = props.get('formTagName');
  const tagName = props.get('tagName');
  const inject = props.get('inject');
  const { isInForm } = inject?.value?.[$formProvide] ?? {};
  useEffect(() => {
    if (!nodePath) return;
    const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
    if (isInForm) {
      elem?.setAttribute('data-has-mutation', 'true');
      elem?.setAttribute('data-element-tag', formTagName);
    } else {
      elem?.setAttribute('data-element-tag', tagName);
    }
  }, [isInForm]);
  return {
    isInForm,
  };
}

handleComponentInForm.order = 6;
handleComponentInForm.type = $ide;

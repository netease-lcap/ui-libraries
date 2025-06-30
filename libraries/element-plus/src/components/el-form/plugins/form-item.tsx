import _ from 'lodash';
import { ElFormItem } from 'element-plus';

import { ref, watch, inject, Ref, getCurrentInstance, VNode, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { ElFormItemWrap } from '@/components/el-form';
import { $formProvide, $formItemProps } from '@/components/el-form/constants';
import { useEffect } from '@/plugins/hooks';
import { categoryStyles } from '@/utils';
import { $provide, $formTagName } from '@/plugins/constants';

type FormItemProvide = {
  [$formProvide]: {
    value: any;
    setValue: (key: string, value: any) => void;
    isInForm: boolean;
    setFormitem: (key: string, value: any) => void;
    deleteFormitem: (key: string) => void;
  };
};

export function withFormItem(Component, name) {
  return {
    name,
    Component,
    inheritAttrs: false,
    props: {
      ...ElFormItem.props,
      modelValue: { type: [String, Number, Boolean, Object, Array], default: undefined },
      'onUpdate:modelValue': { type: Function, default: undefined },
      prop: { type: String, default: undefined },
    },
    setup(props, { attrs, slots, emit, expose }) {
      const componentRef = ref({});
      const myRef = ref({});
      const valueRef = ref({});
      const formItemRef = ref({});
      const uniqueid = _.uniqueId('formItemPropName');
      const prop = computed(() => props.prop ?? uniqueid);
      const provide = inject($provide) as Ref<FormItemProvide>;
      const {
        isInForm,
        setValue,
        value = valueRef,
        setFormitem,
        deleteFormitem,
      } = provide?.value?.[$formProvide] ?? {};
      const { vnode } = getCurrentInstance() as { vnode: VNode };
      const { props: vnodeProps } = vnode;
      const isControlled = Object.prototype.hasOwnProperty.call(vnodeProps, 'modelValue');

      const modelValue = computed(() => (isControlled ? props?.modelValue : value?.[prop.value]));
      const style = computed(() => categoryStyles(_.assign({}, props?.style, attrs.style)));
      const onUpdateModelValue = (value) => {
        const propsOnUpdateModelValue = props?.['onUpdate:modelValue'] ?? (() => {});
        _.attempt(propsOnUpdateModelValue, value);
        _.attempt(setValue, prop.value, value);
      };
      onMounted(() => {
        const { isInForm } = provide?.value?.[$formProvide] ?? {};
        if (!isInForm) {
          const nodePath = attrs['data-nodepath'];
          const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
          elem?.setAttribute('data-has-mutation', 'true');
          elem?.setAttribute('data-element-tag', name.replace('el-form-', 'el-'));
        }
      });
      watch(
        () => props?.modelValue,
        (value) => {
          _.attempt(setValue, prop.value, value);
        },
        {
          deep: true,
        },
      );
      // watch(
      //   provide,
      //   (value) => {
      //     const { isInForm } = value?.[$formProvide] ?? {};
      //     if (!isInForm) {
      //       const nodePath = attrs['data-nodepath'];
      //       onMounted(() => {
      //         const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
      //         elem?.setAttribute('data-has-mutation', 'true');
      //         elem?.setAttribute('data-element-tag', name.replace('el-form-', 'el-'));
      //       });
      //     }
      //   },
      //   {
      //     immediate: true,
      //     deep: true,
      //   },
      // );
      nextTick(() => {
        Object.assign(myRef.value, formItemRef.value, componentRef.value);
      });

      expose(myRef.value);

      onMounted(() => {
        setFormitem?.(prop.value, {
          resetField: () => {
            onUpdateModelValue(undefined);
          },
        });
        _.attempt(setValue, prop.value, modelValue.value);
      });
      onUnmounted(() => {
        deleteFormitem?.(prop.value);
      });

      return () => {
        return (
          <ElFormItemWrap
            {..._.pick(_.assign({}, props, attrs, { prop: prop.value }), $formItemProps)}
            style={style.value.style}
            ref={formItemRef}
            v-slots={{
              label: slots.label,
            }}
          >
            <Component
              {..._.omit(_.assign({ [$formTagName]: name }, props, attrs), $formItemProps)}
              v-slots={_.omit(slots, ['label'])}
              style={style.value.innerStyle}
              v-on={emit}
              ref={componentRef}
              modelValue={modelValue.value}
              onUpdate:modelValue={onUpdateModelValue}
            />
          </ElFormItemWrap>
        );
      };
    },
  };
}
export function handleComponentInForm(props) {
  const nodePath = props.get('data-nodepath');
  const formTagName = props.get('formTagName');
  const tagName = props.get('tagName');
  useEffect(() => {
    const inject = props.get('inject');
    const { isInForm } = inject?.value?.[$formProvide] ?? {};
    if (!nodePath) return;
    const elem = document.querySelector(`[data-nodepath="${nodePath}"]`);
    if (isInForm) {
      elem?.setAttribute('data-has-mutation', 'true');
      elem?.setAttribute('data-element-tag', formTagName);
    } else {
      elem?.setAttribute('data-element-tag', tagName);
    }
  }, []);
}

handleComponentInForm.order = 6;

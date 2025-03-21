import _ from 'lodash';
import { ElFormItem } from 'element-plus';

import { ref, watch, inject, Ref, getCurrentInstance, VNode, computed, onMounted, onUnmounted } from 'vue';
import { ElFormItemWrap } from '@/components/el-form';
import { $formProvide, $formItemProps } from '@/components/el-form/constants';
import { useEffect } from '@/plugins/hooks';
import { $provide } from '@/plugins/constants';

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
      const uniqueid = _.uniqueId('formItemPropName');
      const prop = computed(() => props.prop ?? uniqueid);
      const provide = inject($provide) as Ref<FormItemProvide>;
      const { setValue, value = valueRef, setFormitem, deleteFormitem } = provide?.value?.[$formProvide] ?? {};
      const { vnode } = getCurrentInstance() as { vnode: VNode };
      const { props: vnodeProps } = vnode;
      const isControlled = Object.prototype.hasOwnProperty.call(vnodeProps, 'modelValue');
      const modelValue = computed(() => (isControlled ? props?.modelValue : value?.[prop.value]));
      const onUpdateModelValue = (value) => {
        const propsOnUpdateModelValue = props?.['onUpdate:modelValue'] ?? (() => {});
        _.attempt(propsOnUpdateModelValue, value);
        _.attempt(setValue, prop.value, value);
      };

      watch(componentRef, (value) => Object.assign(myRef.value, value));
      expose(myRef.value);

      onMounted(() => {
        setFormitem(prop.value, {
          resetField: () => {
            onUpdateModelValue(undefined);
          },
        });
      });
      onUnmounted(() => {
        deleteFormitem(prop.value);
      });

      return () => {
        return (
          <ElFormItemWrap
            {..._.pick(_.assign({}, props, attrs, { prop: prop.value }), $formItemProps)}
            v-slots={{
              label: slots.label,
            }}
          >
            <Component
              {..._.omit(_.assign({}, props, attrs), $formItemProps)}
              v-slots={slots}
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

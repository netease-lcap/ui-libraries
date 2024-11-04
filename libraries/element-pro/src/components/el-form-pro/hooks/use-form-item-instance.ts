import {
  inject,
  onBeforeUnmount,
  onMounted,
  SetupContext,
} from '@vue/composition-api';
import { FormExtendsContext } from '../types';
import { FORM_CONTEXT } from '../constants';

export const useFormItemControls = () => {
  const formItemInstances: any[] = [];

  function addFormItemInstance(ins: any) {
    if (formItemInstances.includes(ins)) {
      return;
    }
    formItemInstances.push(ins);
  }

  function removeFormItemInstance(ins: any) {
    const index = formItemInstances.indexOf(ins);
    if (index === -1) {
      return;
    }

    formItemInstances.splice(index, 1);
  }

  function resetFormItemNeedReset() {
    // 组件源码黑操作
    formItemInstances.forEach((ins) => {
      if (ins) {
        ins.needResetField = true;
      }
    });
  }

  return {
    addFormItemInstance,
    removeFormItemInstance,
    resetFormItemNeedReset,
  };
};

export const useRegisterInstance = (ctx: SetupContext) => {
  const {
    addFormItemInstance = () => {},
    removeFormItemInstance = () => {},
  } = inject<FormExtendsContext>(FORM_CONTEXT, {} as any);

  onMounted(() => {
    addFormItemInstance(ctx.refs.$base);
  });

  onBeforeUnmount(() => {
    removeFormItemInstance(ctx.refs.$base);
  });
};

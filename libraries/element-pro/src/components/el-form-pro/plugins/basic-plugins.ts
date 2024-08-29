import type { SubmitContext, ValidateResultContext } from '@element-pro';
import { type NaslComponentPluginOptions, $ref } from '@lcap/vue2-utils';
import { getCurrentInstance } from '@vue/composition-api';

/* 组件功能扩展插件 */
export const useExtensPlugin: NaslComponentPluginOptions = {
  props: [],
  setup(props) {
    const instance = getCurrentInstance();
    return {
      onSubmit: (context: SubmitContext) => {
        const onSubmit = props.get<(e: any) => void>('onSubmit') || (() => {});
        onSubmit({
          ...context,
          valid: context.validateResult === true,
        });
      },
      onValidate: (context: ValidateResultContext<any>) => {
        const onValidate = props.get<(e: any) => void>('onValidate') || (() => {});
        onValidate({
          ...context,
          valid: context.validateResult === true,
        });
      },
      [$ref]: {
        async validate(params = null) {
          if (!instance || !instance.refs || !instance.refs.$base) {
            return false;
          }

          const result = await (instance.refs.$base as any).validate(params);
          return result === true;
        },
        getFormData: async () => {
          return {
            name: '哈哈哈',
            type: '1111',
          };
        },
      },
    };
  },
};

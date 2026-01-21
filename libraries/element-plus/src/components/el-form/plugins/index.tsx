/* eslint-disable no-shadow */
import _ from 'lodash';
import { FormProps } from 'element-plus';
import { $formProvide } from '@/components/el-form/constants';
import { useRef, useEffect, useCallback } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
// import { useCallback } from '../../../plugins/hooks';

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
    const preview = props.get('preview') ?? false;
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
          deleteFormitem: (key) => {
            delete formItemList.value[key];
          },
          preview,
        },
      }),
      ref: Object.assign(ref, {
        validated: async () => {
          _.forEach(Object.entries(formItemList.value), ([key, item]: any) => {
            model.value[key] = item?.getModelValue?.() ?? model.value[key];
          });
          return ref.validate().then(
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
    };
  },
}).addPlugin({
  name: 'handleMcp',
  handle: (props) => {
    const refId = props.get('data-ref-id');
    const ref = props.get('ref');
    useEffect(() => {
      if (window?.UiLibrariesMcp?.subscribe) {
        window.UiLibrariesMcp.subscribe('el_form__validate', refId, () => ref.validated());
        window.UiLibrariesMcp.subscribe('el_form__clearValidate', refId, () => {
          ref?.clearValidate();
        });
      }
      return () => {
        if (window?.UiLibrariesMcp?.unsubscribe) {
          window.UiLibrariesMcp.unsubscribe('el_form__validate', refId);
          window.UiLibrariesMcp.unsubscribe('el_form__clearValidate', refId);
        }
      };
    }, []);
    return {};
  },
});

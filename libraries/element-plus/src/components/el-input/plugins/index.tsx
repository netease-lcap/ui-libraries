import _ from 'lodash';
import { InputProps } from 'element-plus';
import { getPropsIcon } from '@/plugins/common/icon';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';
import { $deletePropsList } from '@/plugins/constants';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { useEffect } from '../../../plugins/hooks';

const InputBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElInputOptions, InputProps>();

export default InputBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleDefaultPrps',
    handle(props) {
      const placeholder = props.get('placeholder') ?? '请输入内容';
      const deletePropsList = props.get($deletePropsList).concat('data-nodepath');
      return {
        placeholder,
        rows: 3,
        formTagName: 'el-form-input',
        tagName: 'el-input',
        [$deletePropsList]: deletePropsList,
      };
    },
  })
  .addPlugin({
    name: 'handleComponentInForm',
    handle: handleComponentInForm,
  })
  .addPlugin({
    name: 'handleControllableValue',
    handle: handleControllableValue,
  })
  .addPlugin({
    name: 'handleSuffixIcon',
    handle: (props) => {
      const suffixIcon = props.get('suffixIcon');
      const prefixIcon = props.get('prefixIcon');
      return {
        suffixIcon: getPropsIcon({ name: suffixIcon }),
        prefixIcon: getPropsIcon({ name: prefixIcon }),
      };
    },
  })
  .addPlugin({
    name: 'handleAppend',
    handle(props) {
      const slots = props.get('slots');
      const showAppend = props.get('showAppend');
      const showPrepend = props.get('showPrepend');
      const { append: appendSlot = () => {}, prepend: prependSlot = () => {} } = _.pick(slots, ['append', 'prepend']);
      const append = showAppend ? { append: appendSlot() } : { append: undefined };
      const prepend = showPrepend ? { prepend: prependSlot() } : { prepend: undefined };

      return {
        slots: _.assign({}, slots, append, prepend),
      };
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);
      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const previewText = inIDE || _.isEmpty(insProps.modelValue) ? '-' : insProps.modelValue;
        return <ElPreview text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
        preview: isPreview,
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle: (props) => {
      const emit = props.get('emit');
      const disabled = props.get('disabled');
      const preview = props.get('preview');
      const readonly = props.get('readonly');
      useEffect(() => {
        emit('sync:state', 'disabled', disabled);
        emit('sync:state', 'preview', preview);
        emit('sync:state', 'readonly', readonly);
      }, [disabled, preview, readonly]);
      return {};
    },
  })
  .addPlugin({
    name: 'handleMcp',
    handle(props) {
      const setValue = props.get('setValue');
      const refId = props.get('data-ref-id');
      useEffect(() => {
        if (window?.UiLibrariesMcp?.subscribe) {
          window.UiLibrariesMcp.subscribe('el_input__change', refId, (value) => _.attempt(setValue, value));
        }
        return () => {
          if (window?.UiLibrariesMcp?.unsubscribe) {
            window.UiLibrariesMcp.unsubscribe('el_input__change', refId);
          }
        };
      }, []);
      return {};
    },
  });

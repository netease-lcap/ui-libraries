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
      };
    },
  });

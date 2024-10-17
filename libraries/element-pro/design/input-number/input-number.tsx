import {
  AddIcon as ElAddIcon,
  RemoveIcon as ElRemoveIcon,
  ChevronDownIcon as ElChevronDownIcon,
  ChevronUpIcon as ElChevronUpIcon,
} from '@element-ui-icons';
import { defineComponent, SetupContext } from '@vue/composition-api';
import ElButton from '../button';
import ElInput from '../input';
import props from './props';
import { ElInputNumberProps } from './type';
import useInputNumber from './useInputNumber';
import { useGlobalIcon } from '../hooks/useGlobalIcon';

export default defineComponent({
  name: 'ElInputNumber',

  props,

  // 保持纯净（逻辑和节点渲染分开）
  setup(props: ElInputNumberProps, context: SetupContext) {
    const p = useInputNumber(props, context);
    const {
      AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon,
    } = useGlobalIcon({
      AddIcon: ElAddIcon,
      RemoveIcon: ElRemoveIcon,
      ChevronDownIcon: ElChevronDownIcon,
      ChevronUpIcon: ElChevronUpIcon,
    });
    return {
      ...p,
      AddIcon,
      RemoveIcon,
      ChevronDownIcon,
      ChevronUpIcon,
    };
  },

  render() {
    const {
      AddIcon, RemoveIcon, ChevronDownIcon, ChevronUpIcon,
    } = this;
    const reduceIcon = this.theme === 'column' ? <ChevronDownIcon size={this.size} /> : <RemoveIcon size={this.size} />;
    const addIcon = this.theme === 'column' ? <ChevronUpIcon size={this.size} /> : <AddIcon size={this.size} />;
    const status = this.isError ? 'error' : this.status;
    return (
      <div class={this.wrapClasses}>
        {this.theme !== 'normal' && (
          <ElButton
            class={this.reduceClasses}
            disabled={this.tDisabled}
            onClick={this.handleReduce}
            variant="outline"
            shape="square"
            icon={() => reduceIcon}
          />
        )}
        <ElInput
          ref="inputRef"
          disabled={this.tDisabled}
          readonly={this.readonly}
          autocomplete="off"
          placeholder={this.placeholder}
          unselectable={this.readonly ? 'on' : 'off'}
          autoWidth={this.autoWidth}
          align={this.align || (this.theme === 'row' ? 'center' : undefined)}
          status={status}
          label={this.label}
          suffix={this.suffix}
          on={this.listeners}
          scopedSlots={this.$scopedSlots}
          props={this.inputProps}
          value={this.userInput}
          onChange={this.onInnerInputChange}
        />
        {this.theme !== 'normal' && (
          <ElButton
            class={this.addClasses}
            disabled={this.tDisabled}
            onClick={this.handleAdd}
            variant="outline"
            shape="square"
            icon={() => addIcon}
          />
        )}
        {this.tips && (
          <div class={`${this.classPrefix}-input__tips ${this.classPrefix}-input__tips--${status}`}>{this.tips}</div>
        )}
      </div>
    );
  },
});

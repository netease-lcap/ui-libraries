import { PropType, CreateElement } from 'vue';
import { ChevronRightIcon as ElChevronRightIcon, ChevronLeftIcon as ElChevronLeftIcon } from '@element-ui-icons';
import Button from '../../button';
import { ElNode } from '../../common';
import mixins from '../../utils/mixins';
import { getClassPrefixMixins, getGlobalIconMixins } from '../../config-provider/config-receiver';

const classPrefixMixins = getClassPrefixMixins('transfer');

export default mixins(classPrefixMixins, getGlobalIconMixins()).extend({
  name: 'ElTransferOperations',
  props: {
    // 控制左按钮的禁用与否
    leftDisabled: {
      type: Boolean,
      required: true,
    },
    // 控制右按钮的禁用与否
    rightDisabled: {
      type: Boolean,
      required: true,
    },
    operation: {
      type: [String, Array, Function, Boolean] as PropType<
        Array<string | ElNode> | ElNode<{ direction: 'left' | 'right' }>
      >,
    },
    operationButton: {
      type: Function,
    }
  },
  methods: {
    moveToRight() {
      this.$emit('moveToRight');
    },
    moveToLeft() {
      this.$emit('moveToLeft');
    },
    getIconRight() {
      const { ChevronRightIcon } = this.useGlobalIcon({ ChevronRightIcon: ElChevronRightIcon });
      return <ChevronRightIcon />;
    },
    getIconLeft() {
      const { ChevronLeftIcon } = this.useGlobalIcon({ ChevronLeftIcon: ElChevronLeftIcon });
      return <ChevronLeftIcon />;
    },
    getIcon(direction: 'left' | 'right') {
      if (typeof this.operation === 'function') {
        return null;
      }
      if (direction === 'right' && this.operation && typeof this.operation[0] === 'function') {
        return null;
      }
      if (direction === 'left' && this.operation && typeof this.operation[1] === 'function') {
        return null;
      }

      if (this.$scopedSlots.operation) {
        return null;
      }

      return direction === 'left' ? this.getIconLeft : this.getIconRight;
    },
    // right:去右边，left:去左边
    _renderButton(h: CreateElement, direction: 'left' | 'right') {
      if (typeof this.$scopedSlots.operation === 'function') {
        return this.$scopedSlots.operation({
          direction,
        });
      }
      if (typeof this.operation === 'function') {
        const renderContent = this.operation;
        return renderContent(h, { direction });
      }
      let renderContent: string | ElNode;
      if (Array.isArray(this.operation)) {
        const [left, right] = this.operation;
        renderContent = direction === 'right' ? right : left;
      } else {
        renderContent = '';
      }
      return renderContent;
    },
    _renderRightOperationButton(h: CreateElement) {
      const { rightDisabled } = this.$props;
      const key = rightDisabled ? 'right-outline' : 'right-base';
      const onClick = this.moveToRight;

      if (typeof this.operationButton === 'function') {
        return this.operationButton(h, { direction: 'right', key, disabled: rightDisabled, onClick });
      }

      return (
        <Button
          variant="outline"
          size="small"
          shape={typeof this.operation?.[1] === 'string' ? 'rectangle' : 'square'}
          key={key}
          disabled={rightDisabled}
          onClick={onClick}
          icon={this.getIcon('right')}
        >
          {this._renderButton(h, 'right')}
        </Button>
      );;
    },
    _renderLeftOperationButton(h: CreateElement) {
      const { leftDisabled } = this.$props;
      const key = leftDisabled ? 'left-outline' : 'left-base';
      const onClick = this.moveToLeft;

      if (typeof this.operationButton === 'function') {
        return this.operationButton(h, { direction: 'left', key, disabled: leftDisabled, onClick });
      }

      return (
        <Button
          variant="outline"
          key={key}
          size="small"
          shape={typeof this.operation?.[0] === 'string' ? 'rectangle' : 'square'}
          disabled={leftDisabled}
          onClick={onClick}
          icon={this.getIcon('left')}
        >
          {this._renderButton(h, 'left')}
        </Button>
      );
    },
  },
  render(h) {
    return (
      <div class={`${this.componentName}__operations`}>
        {this._renderRightOperationButton(h)}
        {this._renderLeftOperationButton(h)}
      </div>
    );
  },
});

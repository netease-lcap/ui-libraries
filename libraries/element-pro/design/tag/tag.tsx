import Vue from 'vue';
import { CloseIcon as ElCloseIcon } from '@element-ui-icons';
import { ScopedSlotReturnValue } from 'vue/types/vnode';
import tinycolor from 'tinycolor2';
import props from './props';
import mixins from '../utils/mixins';
import getConfigReceiverMixins, { TagConfig, getGlobalIconMixins } from '../config-provider/config-receiver';
import { renderElNodeJSX, renderContent } from '../utils/render-tnode';
import { ElTagProps } from './type';
import { emitEvent } from '../utils/event';
import { ElNodeReturnValue, ClassName, Styles } from '../common';

export default mixins(getConfigReceiverMixins<Vue, TagConfig>('tag'), getGlobalIconMixins()).extend({
  name: 'ElTag',

  props: { ...props },

  computed: {
    tagClass(): ClassName {
      return [
        `${this.componentName}`,
        `${this.componentName}--${this.theme}`,
        `${this.componentName}--${this.variant}`,
        this.shape !== 'square' && `${this.componentName}--${this.shape}`,
        {
          [this.commonSizeClassName[this.size]]: this.size !== 'medium',
          [`${this.componentName}--ellipsis`]: this.maxWidth,
          [`${this.componentName}--close`]: this.closable,
          [`${this.classPrefix}-is-disabled`]: this.disabled,
          [`${this.componentName}--disabled`]: this.disabled,
        },
      ];
    },
    textStyle(): Styles {
      if (this.maxWidth) {
        return {
          maxWidth: isNaN(Number(this.maxWidth)) ? this.maxWidth : `${this.maxWidth}px`,
        };
      }
      return {};
    },
    tagStyle(): Styles {
      if (this.color) {
        return this.getTagColorStyle();
      }
      return {};
    },
  },

  methods: {
    handleClose(e: MouseEvent): void {
      if (this.disabled) return;
      emitEvent<Parameters<ElTagProps['onClose']>>(this, 'close', { e });
    },
    handleClick(e: MouseEvent): void {
      if (this.disabled) return;
      emitEvent<Parameters<ElTagProps['onClick']>>(this, 'click', { e });
    },
    getCloseIcon(): ScopedSlotReturnValue {
      if (!this.closable) return null;
      const iconClassName = `${this.classPrefix}-tag__icon-close`;
      if (this.global.closeIcon) {
        return this.global.closeIcon((component, b) => {
          const tProps = typeof b === 'object' && 'attrs' in b ? b.attrs : {};
          return this.$createElement(component, {
            props: { ...tProps },
            class: iconClassName,
            nativeOn: {
              click: this.handleClose,
            },
          });
        });
      }
      const { CloseIcon } = this.useGlobalIcon({ CloseIcon: ElCloseIcon });

      return <CloseIcon nativeOnClick={this.handleClose} class={iconClassName} />;
    },
    getTagColorStyle(): Styles {
      const luminance = tinycolor(this.color).getLuminance();

      const style: Styles = {
        color: luminance > 0.5 ? 'black' : 'white',
      };

      if (this.variant === 'outline' || this.variant === 'light-outline') {
        style.borderColor = this.color;
      }
      if (this.variant !== 'outline') {
        const getLightestShade = () => {
          const { r, g, b } = tinycolor(this.color).toRgb();
          // alpha 0.1  is designed by @wen1kang
          return `rgba(${r}, ${g}, ${b}, 0.1)`;
        };
        style.backgroundColor = this.variant === 'dark' ? this.color : getLightestShade();
      }
      if (this.variant !== 'dark') {
        style.color = this.color;
      }
      return style;
    },
  },

  render() {
    // 关闭按钮 自定义组件使用 nativeOnClick 绑定事件
    const closeIcon = this.getCloseIcon();
    // 标签内容
    const tagContent: ElNodeReturnValue = renderContent(this, 'default', 'content');

    const title = typeof tagContent === 'string' ? tagContent : '';
    const titleAttribute = title && this.maxWidth ? { title } : undefined;
    // 图标
    const icon = renderElNodeJSX(this, 'icon');
    return (
      <div class={this.tagClass} onClick={this.handleClick} style={this.tagStyle}>
        {icon}
        <span
          class={this.maxWidth ? `${this.componentName}--text` : undefined}
          style={this.textStyle}
          attrs={titleAttribute}
        >
          {tagContent}
        </span>
        {!this.disabled ? closeIcon : undefined}
      </div>
    );
  },
});

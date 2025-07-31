/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'modal',
      cacheOpenKey: 'show',
      structured: true,
      selector: {
        expression: 'this',
        cssSelector: '.van-popup',
      },
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '对话框',
    icon: 'dialog',
    description:
      '弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。支持组件调用和函数调用两种方式。',
    group: 'Feedback',
  })
  export class VanDialog extends ViewComponent {
    constructor(options?: Partial<VanDialogOptions>) {
      super();
    }
  }

  export class VanDialogOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否显示弹窗',
      description: '是否显示弹窗',
      setter: { concept: 'SwitchSetter' },
    })
    show: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '弹窗宽度',
      description: '弹窗宽度',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自定义底部按钮区域',
      description: '是否使用自定义底部按钮区域',
      setter: { concept: 'SwitchSetter' },
    })
    useCustomFooter: nasl.core.Boolean = false;
    
    @Prop<VanDialogOptions, 'theme'>({
      group: '主要属性',
      title: '样式风格',
      description: '样式风格',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '默认',
          },
          {
            title: '圆角按钮',
          },
        ],
      },
      if: (_) => !_.useCustomFooter,
    })
    theme: 'default' | 'round-button' = 'default';

    @Prop<VanDialogOptions, 'showCancelButton'>({
      group: '主要属性',
      title: '是否展示取消按钮',
      description: '是否展示取消按钮',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !_.useCustomFooter,
    })
    showCancelButton: nasl.core.Boolean = false;

    @Prop<VanDialogOptions, 'cancelButtonText'>({
      group: '主要属性',
      title: '取消按钮文案',
      description: '取消按钮文案',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.useCustomFooter && _.showCancelButton,
    })
    cancelButtonText: nasl.core.String = '取消';

    @Prop<VanDialogOptions, 'cancelButtonColor'>({
      group: '主要属性',
      title: '取消按钮颜色',
      description: '取消按钮颜色',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.useCustomFooter && _.showCancelButton,
    })
    cancelButtonColor: nasl.core.String;

    @Prop<VanDialogOptions, 'cancelButtonDisabled'>({
      group: '主要属性',
      title: '是否禁用取消按钮',
      description: '是否禁用取消按钮',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !_.useCustomFooter && _.showCancelButton,
    })
    cancelButtonDisabled: nasl.core.Boolean = false;

    @Prop<VanDialogOptions, 'showConfirmButton'>({
      group: '主要属性',
      title: '是否展示确认按钮',
      description: '是否展示确认按钮',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !_.useCustomFooter,
    })
    showConfirmButton: nasl.core.Boolean = true;

    @Prop<VanDialogOptions, 'confirmButtonText'>({
      group: '主要属性',
      title: '确认按钮文案',
      description: '确认按钮文案',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.useCustomFooter && _.showConfirmButton,
    })
    confirmButtonText: nasl.core.String = '确认';

    @Prop<VanDialogOptions, 'confirmButtonColor'>({
      group: '主要属性',
      title: '确认按钮颜色',
      description: '确认按钮颜色',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.useCustomFooter && _.showConfirmButton,
    })
    confirmButtonColor: nasl.core.String = '#ee0a24';

    @Prop<VanDialogOptions, 'confirmButtonDisabled'>({
      group: '主要属性',
      title: '是否禁用确认按钮',
      description: '是否禁用确认按钮',
      setter: { concept: 'SwitchSetter' },
      if: (_) => !_.useCustomFooter && _.showConfirmButton,
    })
    confirmButtonDisabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否在关闭时销毁内容',
      description: '是否在关闭时销毁内容',
      setter: { concept: 'SwitchSetter' },
    })
    destroyOnClose: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'z-index',
      description: '将弹窗的 z-index 层级设置为一个固定值',
      setter: { concept: 'InputSetter' },
    })
    zIndex: nasl.core.String = '2000';

    @Prop({
      group: '主要属性',
      title: '是否展示遮罩层',
      description: '是否展示遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    overlay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在页面回退时自动关闭',
      description: '是否在页面回退时自动关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPopstate: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否在点击遮罩层后关闭弹窗',
      description: '是否在点击遮罩层后关闭弹窗',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickOverlay: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否在显示弹层时才渲染节点',
      description: '是否在显示弹层时才渲染节点',
      setter: { concept: 'SwitchSetter' },
    })
    lazyRender: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否锁定背景滚动',
      description: '是否锁定背景滚动',
      setter: { concept: 'SwitchSetter' },
    })
    lockScroll: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否启用键盘能力',
      description: '是否启用键盘能力，在展示确认和取消按钮的时候，默认情况下键盘的 Enter 和 Esc 会执行 confirm 和 cancel 函数',
      setter: { concept: 'SwitchSetter' },
    })
    keyboardEnabled: nasl.core.Boolean = true;

    @Event({
      title: '点击确认按钮时触发',
      description: '点击确认按钮时触发',
    })
    onConfirm: () => void;

    @Event({
      title: '点击取消按钮时触发',
      description: '点击取消按钮时触发',
    })
    onCancel: () => void;

    @Event({
      title: '打开弹窗时触发',
      description: '打开弹窗时触发',
    })
    onOpen: () => void;

    @Event({
      title: '关闭弹窗前触发',
      description: '关闭弹窗前触发',
    })
    onBeforeClose: () => any;

    @Event({
      title: '关闭弹窗时触发',
      description: '关闭弹窗时触发',
    })
    onClose: () => void;

    @Event({
      title: '打开弹窗且动画结束后触发',
      description: '打开弹窗且动画结束后触发',
    })
    onOpened: () => void;

    @Event({
      title: '关闭弹窗且动画结束后触发',
      description: '关闭弹窗且动画结束后触发',
    })
    onClosed: () => void;

    @Slot({
      title: '自定义内容',
      description: '自定义内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '自定义标题',
      description: '自定义标题',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '自定义底部按钮区域',
      description: '自定义底部按钮区域',
    })
    slotFooter: () => Array<ViewComponent>;
  }
}

/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'modal',
      cacheOpenKey: 'modelValue',
      structured: true,
      selector: {
        expression: 'this',
        cssSelector: '.el-dialog',
      },
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '对话框',
    icon: 'modal',
    description: '在保留当前页面状态的情况下，告知用户并承载相关操作。',
    group: 'Feedback',
  })
  export class ElDialog extends ViewComponent {
    @Method({
      title: '显示弹框',
      description: '显示弹框',
    })
    open(): void {}

    @Method({
      title: '关闭弹框',
      description: '关闭弹框',
    })
    close(): void {}

    @Method({
      title: '内容聚焦',
      description: '输入焦点聚焦在 Dialog 内容时的回调',
    })
    openAutoFocus(): void {}

    @Method({
      title: '内容失焦',
      description: '输入焦点从 Dialog 内容失焦时的回调',
    })
    closeAutoFocus(): void {}

    constructor(options?: Partial<ElDialogOptions>) {
      super();
    }
  }

  export class ElDialogOptions extends ViewComponentOptions {
    @Prop({
      group: '状态属性',
      sync: true,
      title: '显示',
      description: '是否显示对话框',
      setter: { concept: 'SwitchSetter' },
    })
    modelValue: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '标题',
    //   description: '对话框标题',
    //   setter: { concept: 'InputSetter' },
    // })
    // title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '宽度',
      description: '对话框宽度',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String = '50%';

    @Prop({
      group: '主要属性',
      title: '是否全屏',
      description: '是否全屏展示',
      setter: { concept: 'SwitchSetter' },
    })
    fullscreen: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '上边距',
      description: '对话框margin-top值',
      setter: { concept: 'InputSetter' },
    })
    top: nasl.core.String = '15vh';

    @Prop({
      group: '主要属性',
      title: '是否需要遮罩层',
      description: '是否需要遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    modal: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '遮罩层是否插入至body',
    //   description:
    //     '遮罩层是否插入至body元素上，若为false，则遮罩层会插入至对话框的父元素上',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // modalAppendToBody: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '对话框是否插入至body',
      description:
        '对话框自身是否插入至body元素上。嵌套的对话框必须指定该属性并赋值为 true',
      setter: { concept: 'SwitchSetter' },
    })
    appendToBody: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否滚动锁定',
      description: '是否在对话框出现时将body滚动锁定',
      setter: { concept: 'SwitchSetter' },
    })
    lockScroll: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '打开延时',
      description: 'dialog 打开的延时时间，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    openSelay: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '关闭延时',
      description: 'dialog 关闭的延时时间，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    closeSelay: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '是否点击遮罩层关闭',
      description: '是否可以通过点击遮罩层关闭对话框',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickModal: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否通过ESC关闭',
      description: '是否可以通过按下ESC关闭对话框',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPressEscape: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否显示关闭按钮',
      description: '是否显示关闭按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showClose: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否可拖拽',
      description: '为 Dialog 启用可拖拽功能',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean = false;

    @Prop<ElDialogOptions, 'overflow'>({
      group: '主要属性',
      title: '拖拽超出可视区',
      description: '拖动范围可以超出可视区',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.draggable,
    })
    overflow: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '居中',
      description: '是否对头部和底部采用居中布局',
      setter: { concept: 'SwitchSetter' },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '水平垂直对齐对话框',
      description: '是否水平垂直对齐对话框',
      setter: { concept: 'SwitchSetter' },
    })
    alignCenter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '关闭时销毁',
      description: '关闭时销毁对话框中的元素',
      setter: { concept: 'SwitchSetter' },
    })
    destroyOnClose: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '关闭图标',
      description: '自定义关闭图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    closeIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '展示层级',
      description: '和原生的 CSS 的 z-index 相同，改变 z 轴的顺序',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: 'aria-level 属性',
      description: 'header 的 aria-level 属性',
      setter: { concept: 'InputSetter' },
    })
    private headerAriaLevel : nasl.core.String = '2';

    @Event({
      title: '打开的回调',
      description: '对话框打开的回调',
    })
    onOpen: (event: any) => any;

    @Event({
      title: '打开动画结束时的回调',
      description: '对话框打开动画结束时的回调',
    })
    onOpened: (event: any) => any;

    @Event({
      title: '关闭的回调',
      description: '对话框关闭的回调',
    })
    onClose: (event: any) => any;

    @Event({
      title: '关闭前的回调',
      description: '关闭前的回调',
    })
    onBeforeClose: (event: any) => any;

    @Event({
      title: '关闭动画结束时的回调',
      description: '对话框关闭动画结束时的回调',
    })
    onClosed: (event: any) => any;

    // @Event({
    //   title: '输入焦点聚焦在 Dialog 内容时的回调',
    //   description: '输入焦点聚焦在 Dialog 内容时的回调',
    // })
    // onOpenAutoFocus: (event: any) => any;

    // @Event({
    //   title: '输入焦点从 Dialog 内容失焦时的回调',
    //   description: '输入焦点从 Dialog 内容失焦时的回调',
    // })
    // onCloseAutoFocus: (event: any) => any;

    @Slot({
      title: 'Default',
      description: 'Dialog 的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Header',
      description: 'Dialog 标题区的内容',
      snippets: [{ title: '代码⽚段标题', code: '代码⽚段内容' }],
    })
    slotHeader: () => Array<ViewComponent>;

    @Slot({
      title: 'Footer',
      description: 'Dialog 按钮操作区的内容',
    })
    slotFooter: () => Array<ViewComponent>;
  }
}
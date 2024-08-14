/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({})
  @Component({
    title: '对话框',
    icon: 'dialog',
    description: '在保留当前页面状态的情况下，告知用户并承载相关操作。',
    group: 'Feedback',
  })
  export class ElDialog extends ViewComponent {
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
    visible: nasl.core.Boolean = true;

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
    width: nasl.core.String = '30%';

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

    @Prop({
      group: '主要属性',
      title: '遮罩层是否插入至body',
      description:
        '遮罩层是否插入至body元素上，若为false，则遮罩层会插入至对话框的父元素上',
      setter: { concept: 'SwitchSetter' },
    })
    modalAppendToBody: nasl.core.Boolean = true;

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
      title: '自定义类名',
      description: '对话框的自定义类名',
      setter: { concept: 'InputSetter' },
    })
    customClass: nasl.core.String;

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

    // @Prop({
    //   group: '主要属性',
    //   title: '关闭前回调',
    //   description: '关闭前的回调，会暂停对话框的关闭',
    //   setter: { concept: 'InputSetter' },
    // })
    // beforeClose: any;

    @Prop({
      group: '主要属性',
      title: '居中',
      description: '是否对头部和底部采用居中布局',
      setter: { concept: 'SwitchSetter' },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '关闭时销毁',
      description: '关闭时销毁对话框中的元素',
      setter: { concept: 'SwitchSetter' },
    })
    destroyOnClose: nasl.core.Boolean = false;

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

    @Slot({
      title: 'Default',
      description: 'Dialog 的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Title',
      description: 'Dialog 标题区的内容',
      snippets: [{ title: '代码⽚段标题', code: '代码⽚段内容' }],
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: 'Footer',
      description: 'Dialog 按钮操作区的内容',
    })
    slotFooter: () => Array<ViewComponent>;
  }
}

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
    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      sync: true,
      title: '显示状态',
      description: '控制对话框的显示和隐藏',
      docDescription: '绑定对话框的显示状态。true：显示对话框；false：隐藏对话框。支持双向绑定，可以通过程序控制对话框的开关。',
      setter: { concept: 'SwitchSetter' },
    })
    modelValue: nasl.core.Boolean = false;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '对话框宽度',
      description: '设置对话框的宽度',
      docDescription: '设置对话框的宽度。可以设置为具体数值(如"500px")、百分比(如"50%")或视口单位(如"80vw")。',
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String = '50%';

    @Prop({
      group: '主要属性',
      title: '全屏模式',
      description: '是否以全屏模式显示对话框',
      docDescription: '开启后，对话框会占据整个屏幕，提供更大的显示空间。适用于内容较多的对话框。',
      setter: { concept: 'SwitchSetter' },
    })
    fullscreen: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '顶部距离',
      description: '对话框距离顶部的距离',
      docDescription: '设置对话框距离页面顶部的距离。可以设置为具体数值(如"100px")或视口单位(如"15vh")。',
      setter: { concept: 'InputSetter' },
    })
    top: nasl.core.String = '15vh';

    @Prop({
      group: '主要属性',
      title: '居中布局',
      description: '是否对头部和底部采用居中布局',
      docDescription: '开启后，对话框的头部和底部内容会采用居中对齐的布局方式。',
      setter: { concept: 'SwitchSetter' },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '水平垂直居中',
      description: '是否将对话框在页面中水平垂直居中',
      docDescription: '开启后，对话框会在页面中水平和垂直方向都居中显示。',
      setter: { concept: 'SwitchSetter' },
    })
    alignCenter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '关闭图标',
      description: '自定义对话框的关闭图标',
      docDescription: '设置对话框右上角的关闭按钮图标。支持从图标库中选择或使用自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    closeIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示层级',
      description: '设置对话框的显示层级',
      docDescription: '设置对话框的z-index值，控制对话框的显示层级。数值越大，对话框越靠前显示。',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '遮罩层',
      description: '是否显示背景遮罩层',
      docDescription: '开启后，对话框会显示半透明的背景遮罩层，突出对话框内容并阻止用户操作背景页面。',
      setter: { concept: 'SwitchSetter' },
    })
    modal: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '点击遮罩关闭',
      description: '是否允许点击遮罩层关闭对话框',
      docDescription: '开启后，用户可以点击背景遮罩层来关闭对话框。关闭后，只能通过其他方式关闭对话框。',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickModal: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: 'ESC键关闭',
      description: '是否允许按ESC键关闭对话框',
      docDescription: '开启后，用户可以按ESC键来关闭对话框。关闭后，ESC键不会关闭对话框。',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPressEscape: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '显示关闭按钮',
      description: '是否显示右上角的关闭按钮',
      docDescription: '开启后，对话框右上角会显示关闭按钮。关闭后，用户需要通过其他方式关闭对话框。',
      setter: { concept: 'SwitchSetter' },
    })
    showClose: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '可拖拽',
      description: '是否允许拖拽移动对话框',
      docDescription: '开启后，用户可以通过拖拽对话框头部来移动对话框位置。适用于需要调整位置的场景。',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean = false;

    @Prop<ElDialogOptions, 'overflow'>({
      group: '交互属性',
      title: '拖拽超出',
      description: '是否允许拖拽超出可视区域',
      docDescription: '开启后，拖拽对话框时可以将其移动到可视区域之外。关闭后，对话框会被限制在可视区域内。',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.draggable,
    })
    overflow: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '滚动锁定',
      description: '是否在对话框显示时锁定页面滚动',
      docDescription: '开启后，当对话框显示时会锁定背景页面的滚动，防止用户滚动背景内容。',
      setter: { concept: 'SwitchSetter' },
    })
    lockScroll: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '插入到body',
      description: '是否将对话框插入到body元素',
      docDescription: '开启后，对话框会被插入到body元素上，避免被父元素的样式影响。嵌套对话框必须开启此选项。',
      setter: { concept: 'SwitchSetter' },
    })
    appendToBody: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '关闭时销毁',
      description: '关闭时是否销毁对话框内容',
      docDescription: '开启后，当对话框关闭时会销毁其中的所有元素，释放内存。关闭后，对话框内容会被保留。',
      setter: { concept: 'SwitchSetter' },
    })
    destroyOnClose: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '打开延时',
      description: '对话框打开的延时时间',
      docDescription: '设置对话框打开前的延时时间，单位毫秒。可以用于控制对话框的显示时机。',
      setter: { concept: 'NumberInputSetter' },
    })
    openDelay: nasl.core.Integer = 0;

    @Prop({
      group: '交互属性',
      title: '关闭延时',
      description: '对话框关闭的延时时间',
      docDescription: '设置对话框关闭前的延时时间，单位毫秒。可以用于控制对话框的关闭时机。',
      setter: { concept: 'NumberInputSetter' },
    })
    closeDelay: nasl.core.Integer = 0;

    @Event({
      title: '打开的回调',
      description: '对话框打开的回调',
    })
    onOpen: () => any;

    @Event({
      title: '打开动画结束时的回调',
      description: '对话框打开动画结束时的回调',
    })
    onOpened: () => any;

    @Event({
      title: '关闭前的回调',
      description: '关闭前的回调',
    })
    onBeforeClose: (event: Function) => any;

    @Event({
      title: '关闭的回调',
      description: '对话框关闭的回调',
    })
    onClose: () => any;

    @Event({
      title: '关闭动画结束时的回调',
      description: '对话框关闭动画结束时的回调',
    })
    onClosed: () => any;

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
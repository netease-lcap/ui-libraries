/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'drawer',
      cacheOpenKey: 'modelValue',
      structured: true,
      selector: {
        expression: 'this',
        cssSelector: '.el-drawer',
      },
    },
  })
  @Component({
    title: '抽屉',
    icon: 'drawer',
    description:
      '有些时候, `Dialog` 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, `Drawer` 拥有和 `Dialog` 几乎相同的 API, 在 UI 上带来不一样的体验.',
    group: 'Feedback',
  })
  export class ElDrawer extends ViewComponent {
    constructor(options?: Partial<ElDrawerOptions>) {
      super();
    }

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
      description: '输入焦点聚焦在 Drawer 内容时的回调',
    })
    openAutoFocus(): void {}

    @Method({
      title: '内容失焦',
      description: '输入焦点从 Drawer 内容失焦时的回调',
    })
    closeAutoFocus(): void {}
  }

  export class ElDrawerOptions extends ViewComponentOptions {
    @Prop({
      group: '状态属性',
      sync: true,
      title: '显示',
      description: '是否显示 Drawer',
      setter: { concept: 'SwitchSetter' },
    })
    modelValue: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Drawer 自身是否插入至 body 元素上',
      description:
        'Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true',
      setter: { concept: 'SwitchSetter' },
    })
    appendToBody: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否滚动锁定',
      description: '是否在 Drawer 出现时将 body 滚动锁定',
      setter: { concept: 'SwitchSetter' },
    })
    lockScroll: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '关闭前的回调，会暂停 Drawer 的关闭',
    //   description: '关闭前的回调，会暂停 Drawer 的关闭',
    //   setter: { concept: 'InputSetter' },
    // })
    // beforeClose: any;

    @Prop({
      group: '主要属性',
      title: '是否点击遮罩层关闭',
      description: '是否可以通过点击遮罩层关闭Drawer',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnClickModal: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否可以通过按下 ESC 关闭 Drawer',
      description: '是否可以通过按下 ESC 关闭 Drawer',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPressEscape: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '打开延时',
      description: 'Drawer 打开的延时时间，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    openDelay: nasl.core.Decimal = 0;


    @Prop({
      group: '主要属性',
      title: '关闭延时',
      description: 'Drawer 打开的延时时间，单位毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    closeDelay: nasl.core.Decimal = 0;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Drawer 的自定义类名',
    //   description: 'Drawer 的自定义类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // customClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否在关闭后销毁子元素',
      description: '控制是否在关闭 Drawer 之后将子元素全部销毁',
      setter: { concept: 'SwitchSetter' },
    })
    destroyOnClose: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否需要遮罩层',
      description: '是否需要遮罩层',
      setter: { concept: 'SwitchSetter' },
    })
    modal: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '遮罩层是否插入至 body 元素上',
    //   description:
    //     '遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // modalAppendToBody: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Drawer 打开的方向',
      description: 'Drawer 打开的方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '从右往左开' },
          { title: '从左往右开' },
          { title: '从上往下开' },
          { title: '从下往上开' },
        ],
      },
    })
    direction: 'rtl' | 'ltr' | 'ttb' | 'btt' = 'rtl';

    @Prop({
      group: '主要属性',
      title: '是否显示关闭按钮',
      description: '是否显示关闭按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showClose: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description:
        "Drawer 窗体的大小, 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%', 否则便会以 `number` 类型解释",
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.Decimal | nasl.core.String = '30%';

    @Prop({
      group: '主要属性',
      title: '控制是否显示 header 栏',
      description:
        '控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效',
      setter: { concept: 'SwitchSetter' },
    })
    withHeader: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '展示层级',
      description: '和原生的 CSS 的 z-index 相同，改变 z 轴的顺序',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer;

    // @Prop({
    //   group: '主要属性',
    //   title: 'aria-level 属性',
    //   description: 'header 的 aria-level 属性',
    //   setter: { concept: 'InputSetter' },
    // })
    // headerAriaLevel : nasl.core.String = '2';

    @Event({
      title: 'Drawer 打开的回调',
      description: 'Drawer 打开的回调',
    })
    onOpen: (event: any) => any;

    @Event({
      title: 'Drawer 打开动画结束时的回调',
      description: 'Drawer 打开动画结束时的回调',
    })
    onOpened: (event: any) => any;

    @Event({
      title: 'Drawer 关闭的回调',
      description: 'Drawer 关闭的回调',
    })
    onClose: (event: any) => any;

    @Event({
      title: '关闭前的回调',
      description: '关闭前的回调，会暂停 Drawer 的关闭',
    })
    onBeforeClose: (event: any) => any;

    @Event({
      title: 'Drawer 关闭动画结束时的回调',
      description: 'Drawer 关闭动画结束时的回调',
    })
    onClosed: (event: any) => any;

    @Slot({
      title: 'Drawer 的内容',
      description: 'Drawer 的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Drawer 标题区的内容',
      description: 'Drawer 标题区的内容',
    })
    slotHeader: () => Array<ViewComponent>;

    @Slot({
      title: 'Drawer 页脚部分',
      description: 'Drawer 页脚部分',
    })
    slotFooter: () => Array<ViewComponent>;
  }
}

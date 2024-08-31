/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'drawer',
      cacheOpenKey: 'visible',
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
      title: 'Close Drawer',
      description: '用于关闭 Drawer, 该方法会调用传入的 `before-close` 方法',
    })
    closeDrawer(): any {}
  }

  export class ElDrawerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Drawer 自身是否插入至 body 元素上',
      description:
        'Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true',
      setter: { concept: 'SwitchSetter' },
    })
    appendToBody: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '关闭前的回调，会暂停 Drawer 的关闭',
    //   description: '关闭前的回调，会暂停 Drawer 的关闭',
    //   setter: { concept: 'InputSetter' },
    // })
    // beforeClose: any;

    @Prop({
      group: '主要属性',
      title: '是否可以通过按下 ESC 关闭 Drawer',
      description: '是否可以通过按下 ESC 关闭 Drawer',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPressEscape: nasl.core.Boolean = true;

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

    @Prop({
      group: '主要属性',
      title: '遮罩层是否插入至 body 元素上',
      description:
        '遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上',
      setter: { concept: 'SwitchSetter' },
    })
    modalAppendToBody: nasl.core.Boolean = true;

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

    // @Prop({
    //   group: '主要属性',
    //   title: 'Drawer 的标题',
    //   description: 'Drawer 的标题，也可通过具名 slot （见下表）传入',
    //   setter: { concept: 'InputSetter' },
    // })
    // title: nasl.core.String;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '是否显示 Drawer',
      description: '是否显示 Drawer，支持 .sync 修饰符',
      setter: { concept: 'SwitchSetter' },
    })
    visible: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '点击遮罩层是否可以关闭 Drawer',
      description: '点击遮罩层是否可以关闭 Drawer',
      setter: { concept: 'SwitchSetter' },
    })
    wrapperClosable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '控制是否显示 header 栏',
      description:
        '控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效',
      setter: { concept: 'SwitchSetter' },
    })
    withHeader: nasl.core.Boolean = true;

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
    slotTitle: () => Array<ViewComponent>;
  }
}

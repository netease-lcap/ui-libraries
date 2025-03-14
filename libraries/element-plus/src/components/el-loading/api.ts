/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: "messager",
      cacheOpenKey: "visible"
    }
  })
  @Component({
    title: 'Loading加载',
    icon: 'loading',
    description: '加载数据时显示动效。',
    group: 'Feedback',
  })
  export class ElLoading extends ViewComponent {
    @Method({
      title: '显示加载',
      description: '显示加载',
    })
    open(): void {}

    @Method({
      title: '关闭加载',
      description: '关闭加载',
    })
    close(): void {}

    constructor(options?: Partial<ElMessageOptions>) {
      super();
    }
  }

  export class ElLoadingOptions extends ViewComponentOptions {
    @Prop({
      title: '显示',
      description: '是否显示',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
      sync: true,
    })
    visible: nasl.core.Boolean = false;

    @Prop({
      title: 'Loading覆盖的节点',
      description: 'Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点',
      group: '主要属性',
      setter: {
        concept: 'InputSetter',
      },
    })
    target: nasl.core.String;

    @Prop({
      title: '是否将Loading插入至body下',
      description: '将 Loading 遮罩层直接插入到 document.body 根节点下',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    body: nasl.core.Boolean = false;

    @Prop({
      title: '是否全屏显示Loading',
      description: '是否全屏显示Loading',
      group: '主要属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    fullscreen: nasl.core.Boolean = true;
    
    @Prop({
      group: '主要属性',
      title: '是否滚动锁定',
      description: '是否在Loading出现时将body滚动锁定',
      setter: { concept: 'SwitchSetter' },
    })
    lock: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载文案',
      description: '显示在加载图标下方的加载文案',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '自定义加载图标类名',
    //   description: '自定义加载图标类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // spinner: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自定义加载器',
      description: '自定义 SVG 元素覆盖默认加载器',
      setter: { concept: 'InputSetter' },
    })
    svg: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '设置 viewBox 属性',
      description: '设置用于加载 svg 元素的 viewBox 属性',
      setter: { concept: 'InputSetter' },
    })
    svgViewBox: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '遮罩层背景色',
      description: '遮罩层背景色',
      setter: { concept: 'InputSetter' },
    })
    background: nasl.core.String;

    @Event({
      title: '关闭前的回调',
      description: 'Loading 关闭之前执行的函数。 如果此函数返回 false ，关闭过程将被中止。 反之，loading 将被关闭。',
    })
    onBeforeClose: (event: any) => any;

    @Event({
      title: 'Loading完全关闭后的回调',
      description: 'Loading 完全关闭后触发的函数',
    })
    onClosed: (event: any) => any;

    // @Slot({
    //   title: 'Loading内容',
    //   description: 'Loading内容',
    // })
    // slotDefault: () => Array<ViewComponent>;
  }
}

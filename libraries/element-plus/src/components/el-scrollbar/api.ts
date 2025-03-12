/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
      childAccept: true,
      selector: {
        expression: 'this',
        cssSelector: '.el-scrollbar',
      },
      defaultStyleInBoard: {
        height: '300px',
      },
    },
  })
  @Component({
    title: '滚动条',
    icon: 'scrollbar',
    description: '用于替换浏览器原生滚动条',
    group: 'Navigation',
  })
  export class ElScrollbar extends ViewComponent {
    @Method({
      title: '触发滚动事件',
      description: '触发滚动事件',
    })
    handleScroll(): void {}

    @Method({
      title: '滚动到特定坐标',
      description: '滚动到顶部',
    })
    scrollTo(): void {}
    

    constructor(options?: Partial<ElScrollbarOptions>) {
      super();
    }
  }

  export class ElScrollbarOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '高度',
      description: '滚动条高度',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '最大高度',
      description: '滚动条最大高度',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '总是显示',
      description: '总是显示滚动条',
      setter: { concept: 'SwitchSetter' },
    })
    always: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '原生',
      description: '是否使用原生滚动条样式',
      setter: { concept: 'SwitchSetter' },
    })
    native: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '换行',
      description: '是否自动换行',
      setter: { concept: 'SwitchSetter' },
    })
    wrapStyle: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '无限滚动距离',
      description: '触发加载的距离阈值',
      setter: { concept: 'NumberInputSetter' },
    })
    minSize: nasl.core.Decimal = 20;

    @Prop({
      group: '主要属性',
      title: '无限滚动',
      description: '是否开启无限滚动',
      setter: { concept: 'SwitchSetter' },
    })
    noresize: nasl.core.Boolean = false;

    @Event({
      title: '滚动时',
      description: '当滚动条滚动时触发',
    })
    onScroll: (event: { scrollTop: number; scrollLeft: number }) => any;

    @Slot({
      title: 'Default',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}

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
    icon: 'Scrollbar',
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

    @Method({
      title: '设置滚动条到顶部的距离',
      description: '设置滚动条到顶部的距离',
    })
    setScrollTop(
      @Param({
        title: '高度',
        description: '滚动条到顶部的距离',
      })
      scrollTop: nasl.core.Integer,
    ): void {}

  
    @Method({
      title: '设置滚动条到左边的距离',
      description: '设置滚动条到左边的距离',
    })
    setScrollLeft(
      @Param({
        title: '宽度',
        description: '滚动条到左边的距离',
      })
      scrollLeft: nasl.core.Integer,
    ): void {}


    @Method({
      title: '更新滚动条状态',
      description: '更新滚动条状态',
    })
    update(): void {}
    

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
      title: '滚动条最小尺寸',
      description: '滚动条最小尺寸',
      setter: { concept: 'NumberInputSetter' },
    })
    minSize: nasl.core.Decimal = 20;

    @Prop({
      group: '主要属性',
      title: '滚动条容器样式',
      description: '滚动条容器样式',
      setter: { concept: 'InputSetter' },
    })
    wrapStyle: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '视图的自定义样式',
      description: '视图的自定义样式',
      setter: { concept: 'InputSetter' },
    })
    viewStyle: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '不响应容器尺寸变化',
      description: '不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能',
      setter: { concept: 'SwitchSetter' },
    })
    noresize: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '视图标签',
      description: '视图的元素标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'div';

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

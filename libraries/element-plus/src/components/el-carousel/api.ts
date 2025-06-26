/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-carousel-item'",
      forceUpdateWhenAttributeChange: true,
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 1,
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
      additionalAttribute: {
        ':autoplay': '"false"',
        arrow: '"always"',
      },
      events: {
        click: true,
      },
      displaySlotConditions: {
        content: "!!this.getAttribute('dataSource')",
      },
    },
  })
  @Component({
    title: '走马灯',
    icon: 'carousel',
    description: '在有限空间内，循环播放同一类型的图片、文字等内容',
    group: 'Display',
  })
  export class ElCarousel<T> extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    @Method({
      title: 'undefined',
      description: '手动切换幻灯片',
    })
    setActiveItem(
      @Param({
        title: 'undefined',
        description: '传入需要切换的幻灯片的索引，从 0 开始；或相应 el-carousel-item 的 name 属性值',
      })
      index: nasl.core.String | nasl.core.Integer,
    ): void {}

    @Method({
      title: 'undefined',
      description: '切换至上一张幻灯片',
    })
    prev(): void {}

    @Method({
      title: 'undefined',
      description: '切换至下一张幻灯片',
    })
    next(): void {}

    constructor(options?: Partial<ElCarouselOptions<T>>) {
      super();
    }
  }

  export class ElCarouselOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}],
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '名字字段',
      description: '集合的元素类型中，用于设置子项名字字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    nameField: (item: T) => nasl.core.String = ((item: any) => item.name) as any;

    @Prop({
      group: '主要属性',
      title: '高度',
      description: '走马灯高度，例如：150px',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '初始状态激活的幻灯片的索引',
      description: '初始状态激活的幻灯片的索引，从 0 开始',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    initialIndex: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '触发方式',
      description: '指示器的触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '鼠标悬浮' }, { title: '点击' }],
      },
    })
    trigger: 'hover' | 'click' = 'hover';

    @Prop({
      group: '主要属性',
      title: '自动切换',
      description: '是否自动切换',
      setter: { concept: 'SwitchSetter' },
    })
    autoplay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '自动切换的时间间隔',
      description: '自动切换的时间间隔，单位为毫秒',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    interval: nasl.core.Integer = 3000;

    @Prop({
      group: '主要属性',
      title: '指示器的位置',
      description: '指示器的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '隐藏' }, { title: '外部' }],
      },
    })
    indicatorPosition: '' | 'none' | 'outside' = '';

    @Prop({
      group: '主要属性',
      title: '切换箭头的显示时机',
      description: '切换箭头的显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '总是' }, { title: '鼠标悬浮' }, { title: '从不' }],
      },
    })
    arrow: 'always' | 'hover' | 'never' = 'hover';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '走马灯的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '卡片' }],
      },
    })
    type: '' | 'card' = '';

    @Prop<ElCarouselOptions<T>, 'cardScale'>({
      group: '主要属性',
      title: '二级卡的缩放大小',
      description: '当 type 为 card时，二级卡的缩放大小',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => _.type === 'card',
    })
    cardScale: nasl.core.Decimal = 0.83;

    @Prop({
      group: '主要属性',
      title: '循环显示',
      description: '是否循环显示',
      setter: { concept: 'SwitchSetter' },
    })
    loop: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '展示的方向',
      description: '展示的方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '鼠标悬浮时暂停自动切换',
      description: '鼠标悬浮时暂停自动切换',
      setter: { concept: 'SwitchSetter' },
    })
    pauseOnHover: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '添加动态模糊',
      description: '添加动态模糊以给走马灯注入活力和流畅性',
      setter: { concept: 'SwitchSetter' },
    })
    motionBlur: nasl.core.Boolean = false;

    @Event({
      title: '当前激活面板改变时触发',
      description: '当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`)',
    })
    onChange: (event: { current: nasl.core.Integer; prev: nasl.core.Integer }) => any;

    @Slot({
      title: '内容',
      description: '内容',
      snippets: [
        {
          title: '走马灯项',
          code: `<el-carousel-item></el-carousel-item>`,
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '走马灯内容',
      description: '走马灯内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'el-carousel'",
    },
  })
  @Component({
    title: '走马灯项',
    icon: 'carousel-item',
    description: '',
    group: 'Display',
  })
  export class ElCarouselItem extends ViewComponent {
    constructor(options?: Partial<ElCarouselItemOptions>) {
      super();
    }
  }

  export class ElCarouselItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '名字',
      description: '幻灯片的名字',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '幻灯片所对应指示器的文本',
      description: '幻灯片所对应指示器的文本',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String | nasl.core.Decimal;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}

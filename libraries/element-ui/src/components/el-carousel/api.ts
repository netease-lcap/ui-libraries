/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-carousel-item'",
      events: {
        click: true,
      },
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        emptySlot: {
          display: 'large',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
      slotInlineStyle: {
        item: 'height: 100%;',
      },
      slotWrapperInlineStyle: {
        item: 'height: 100%;',
      },
      additionalAttribute: {
        ':autoplay': '"false"',
        trigger: '"click"',
        arrow: '"always"',
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
    constructor(options?: Partial<ElCarouselOptions<T>>) {
      super();
    }

    @Method({
      title: '手动切换幻灯片',
      description: '手动切换幻灯片',
    })
    setActiveItem(
      @Param({
        title: '需要切换的幻灯片的索引或相应幻灯片名称',
        description:
          '需要切换的幻灯片的索引，从 0 开始；或相应 el-carousel-item 的 name 属性值',
      })
      value: nasl.core.String | nasl.core.Integer,
    ): void {}

    @Method({
      title: '切换至上一张幻灯片',
      description: '切换至上一张幻灯片',
    })
    prev(): any {}

    @Method({
      title: '切换至下一张幻灯片',
      description: '切换至下一张幻灯片',
    })
    next(): any {}

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
  }

  export class ElCarouselOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '幻灯片的名称字段',
      description: '集合的元素类型中，用于幻灯片的名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    nameField: (item: T) => nasl.core.String = ((item: any) => item.name) as any;

    @Prop({
      group: '数据属性',
      title: '幻灯片指示器的文本字段',
      description: '集合的元素类型中，用于指示器的文本字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    labelField: (item: T) => nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '走马灯的高度',
      description: '走马灯的高度',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String;

    @Prop<ElCarouselOptions<T>, 'direction'>({
      group: '主要属性',
      title: '展示的方向',
      description: '走马灯展示的方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
      onChange: [
        {
          update: {
            indicatorPosition: '',
          },
          if: (_) => _ === 'vertical',
        },
      ],
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '初始状态激活的幻灯片的索引',
      description: '初始状态激活的幻灯片的索引，从 0 开始',
      setter: { concept: 'NumberInputSetter' },
    })
    initialIndex: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '指示器的触发方式',
      description: '指示器的触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '鼠标悬停' }, { title: '点击' }],
      },
    })
    trigger: '' | 'click' = '';

    @Prop({
      group: '主要属性',
      title: '是否自动切换',
      description: '是否自动切换',
      setter: { concept: 'SwitchSetter' },
    })
    autoplay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '切换的时间间隔',
      description: '自动切换的时间间隔，单位为毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    interval: nasl.core.Decimal = 3000;

    @Prop<ElCarouselOptions<T>, 'indicatorPosition'>({
      group: '主要属性',
      title: '指示器的位置',
      description: '指示器的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '幻灯片内部' },
          { title: '幻灯片外部', if: (_) => _.direction === 'horizontal' },
          { title: '不显示' },
        ],
      },
    })
    indicatorPosition: '' | 'outside' | 'none' = '';

    @Prop({
      group: '主要属性',
      title: '切换箭头的显示时机',
      description: '切换箭头的显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '一直显示' },
          { title: '鼠标悬停时' },
          { title: '不显示' },
        ],
      },
    })
    arrow: 'always' | 'hover' | 'never' = 'hover';

    @Prop({
      group: '主要属性',
      title: '走马灯的类型',
      description: '走马灯的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '卡片' }],
      },
    })
    type: '' | 'card' = '';

    @Prop({
      group: '主要属性',
      title: '循环显示',
      description: '是否循环显示',
      setter: { concept: 'SwitchSetter' },
    })
    loop: nasl.core.Boolean = true;

    @Event({
      title: '改变后',
      description: '幻灯片切换时触发',
    })
    onChange: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

    @Slot({
      title: '幻灯片列表',
      description: '插入幻灯片列表',
      emptyBackground: 'add-sub-large',
      snippets: [
        {
          title: '幻灯片',
          code: '<el-carousel-item><el-image style="width: 100%; height: 100%" fit="cover" src="https://static-vusion.163yun.com/assets/cloud-ui/6.jpg"></el-carousel-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '幻灯片内容',
      description: '幻灯片内容',
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('el-carousel')",
      slotInlineStyle: {
        default: 'height: 100%;',
      },
      slotWrapperInlineStyle: {
        default: 'height: 100%;',
      },
    },
  })
  @Component({
    title: '幻灯片',
    description: '幻灯片',
  })
  export class ElCarouselItem extends ViewComponent {
    constructor(options?: Partial<ElCarouselItemOptions>) {
      super();
    }
  }

  export class ElCarouselItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '幻灯片的名称',
      description: '幻灯片的名字，可用作 `setActiveItem` 的参数',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '指示器的文本',
      description: '该幻灯片所对应指示器的文本',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Slot({
      title: '幻灯片内容',
      description: '幻灯片内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}

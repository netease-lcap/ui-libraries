/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 11,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-timeline-item'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ' > .el-timeline-item',
        emptySlot: {
          display: 'large',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
      displaySlotConditions: {
        content: "!!this.getAttribute('dataSource')",
      },
    },
  })
  @Component({
    title: '时间线',
    icon: 'timeline',
    description: '可视化地呈现时间流信息。',
    group: 'Display',
  })
  export class ElTimeline<T, V> extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElTimelineOptions<T, V>>) {
      super();
    }
  }

  export class ElTimelineOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<ElTimelineOptions<T, V>, 'timestampField'>({
      group: '数据属性',
      title: '时间戳字段',
      description: '集合的元素类型中，用于标识时间戳的属性，string类型',
      docDescription: '集合的元素类型中，用于标识时间戳的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    timestampField: (item: T) => nasl.core.String = ((item: any) => item.timestamp) as any;

    @Prop<ElTimelineOptions<T, V>, 'hideTimestampField'>({
      group: '数据属性',
      title: '隐藏时间戳字段',
      description: '集合的元素类型中，用于标识是否隐藏时间戳的属性，boolean类型，默认为 false`,',
      docDescription: '集合的元素类型中，用于标识是否隐藏时间戳的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    hideTimestampField: (item: T) => nasl.core.Boolean = ((item: any) => item.hideTimestamp) as any;

    @Prop<ElTimelineOptions<T, V>, 'centerField'>({
      group: '数据属性',
      title: '垂直居中字段',
      description: '集合的元素类型中，用于标识是否垂直居中的属性，boolean类型，默认为 false`,',
      docDescription: '集合的元素类型中，用于标识是否垂直居中的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    centerField: (item: T) => nasl.core.Boolean = ((item: any) => item.center) as any;

    @Prop<ElTimelineOptions<T, V>, 'placementField'>({
      group: '数据属性',
      title: '时间戳位置字段',
      description: `集合的元素类型中，用于标识时间戳位置的属性, 'top' | 'bottom'，默认为 'bottom'`,
      docDescription: '集合的元素类型中，用于标识时间戳位置的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    placementField: (item: T) => nasl.core.String = ((item: any) => item.placement) as any;

    @Prop<ElTimelineOptions<T, V>, 'typeField'>({
      group: '数据属性',
      title: '节点类型字段',
      description: `集合的元素类型中，用于标识节点类型的属性, 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''`,
      docDescription: '集合的元素类型中，用于标识节点类型的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    typeField: (item: T) => nasl.core.String = ((item: any) => item.type) as any;

    @Prop<ElTimelineOptions<T, V>, 'colorField'>({
      group: '数据属性',
      title: '节点颜色字段',
      description: `集合的元素类型中，用于标识节点颜色的属性, 'hsl' | 'hsv' | 'hex' | 'rgb'`,
      docDescription: '集合的元素类型中，用于标识节点颜色的属性，支持自定义变更',
      
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    colorField: (item: T) => nasl.core.String = ((item: any) => item.color) as any;

    @Prop<ElTimelineOptions<T, V>, 'sizeField'>({
      group: '数据属性',
      title: '节点尺寸字段',
      description: `集合的元素类型中，用于标识节点尺寸的属性, 'normal' | 'large'，默认为 'normal'`,
      docDescription: '集合的元素类型中，用于标识节点尺寸的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    sizeField: (item: T) => nasl.core.String = ((item: any) => item.size) as any;

    @Prop<ElTimelineOptions<T, V>, 'iconField'>({
      group: '数据属性',
      title: '自定义图标字段',
      description: `集合的元素类型中，用于标识自定义图标的属性, string类型`,
      docDescription: '集合的元素类型中，用于标识自定义图标的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    iconField: (item: T) => nasl.core.String = ((item: any) => item.icon) as any;

    @Prop<ElTimelineOptions<T, V>, 'hollowField'>({
      group: '数据属性',
      title: '空心点字段',
      description: `集合的元素类型中，用于标识是否空心点的属性, boolean类型, 默认为 false`,
      docDescription: '集合的元素类型中，用于标识是否空心点的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    hollowField: (item: T) => nasl.core.Boolean = ((item: any) => item.hollow) as any;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: '时间线项',
          code: '<el-timeline-item></el-timeline-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '时间线项内容',
      description: '时间线项内容',
    })
    slotContent: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'el-timeline'",
      disableSlotAutoFill: [
        {
          slot: 'dot',
          fill: "this.getAttribute('useSlotIcon')?.value",
        },
      ],
      slotInlineStyle: {
        dot: 'min-width: auto;',
      },
    },
  })
  @Component({
    title: '时间线项',
    icon: 'timeline-item',
    description: '',
    group: 'Display',
  })
  export class ElTimelineItem extends ViewComponent {
    constructor(options?: Partial<ElTimelineItemOptions>) {
      super();
    }
  }

  export class ElTimelineItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '时间戳',
      description: '时间戳',
      setter: { concept: 'InputSetter' },
    })
    timestamp: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '隐藏时间戳',
      description: '是否隐藏时间戳',
      setter: { concept: 'SwitchSetter' },
    })
    hideTimestamp: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '垂直居中',
      description: '是否垂直居中',
      setter: { concept: 'SwitchSetter' },
    })
    center: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '时间戳位置',
      description: '时间戳位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '下' }],
      },
    })
    placement: 'top' | 'bottom' = 'bottom';

    @Prop({
      group: '主要属性',
      title: '节点类型',
      description: '节点类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要' },
          { title: '成功' },
          { title: '警告' },
          { title: '危险' },
          { title: '信息' },
          { title: '默认' },
        ],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | '' = '';

    @Prop({
      group: '主要属性',
      title: '节点尺寸',
      description: '节点尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '正常' }, { title: '大' }],
      },
    })
    size: 'normal' | 'large' = 'normal';

    @Prop({
      group: '主要属性',
      title: '节点背景色',
      description: '节点Dot背景色，格式为#eeeeee, red, rgba(0, 0, 0, 0.5)',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '节点图标',
      description: '节点图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '空心点',
      description: '是否空心点',
      setter: { concept: 'SwitchSetter' },
    })
    hollow: nasl.core.Boolean = false;

    @Slot({
      title: 'Default',
      description: 'Timeline-Item 的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Dot',
    //   description: 'Timeline-Item 的自定义节点',
    // })
    // slotDot: () => Array<ViewComponent>;
  }
}

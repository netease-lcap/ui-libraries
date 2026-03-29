/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      forceRefresh: { slot: 'cell' },
      additionalAttribute: {
        ':showInDesigner': '"true"',
      },
    },
  })
  @Component({
    title: '日历',
    icon: 'calendar',
    description: '显示日期',
    group: 'Table',
  })
  export class ElCalendar<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(options?: Partial<ElCalendarOptions<T, V, P, M, C>>) {
      super();
    }
  }

  export class ElCalendarOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean, C> extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '选中日期',
      sync: true,
      description: '当前选中的日期',
      docDescription: '绑定当前选中的日期，支持双向绑定。可以是Date对象或日期字符串。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Date | nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '时间范围',
      description: '日历显示的时间范围',
      docDescription: '设置日历显示的时间范围，包括开始时间与结束时间。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。',
      setter: { concept: 'InputSetter' },
    })
    range: nasl.collection.List<nasl.core.Date | nasl.core.String>;

    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '设置日历的数据来源，支持绑定集合类型变量或返回集合的逻辑',
      docDescription:
        '可以绑定 List<nasl.core.Date | nasl.core.String> 类型的变量，或者绑定返回 List<nasl.core.Date | nasl.core.String> 类型的逻辑。当使用数据源时，日历会根据数据动态生成日期，每个日期对应一个日期单元格。',
      setter: {
        concept: 'DataSourceSetter',
      },
    })
    dataSource: { list: nasl.collection.List<nasl.core.Date | nasl.core.String>; total: nasl.core.Integer } | nasl.collection.List<nasl.core.Date | nasl.core.String>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源中每个数据项的类型定义，用于类型推导和属性选择',
      docDescription: '此属性为只读，当绑定数据源后会自动识别数据项的类型T，用于在插槽中提供类型提示和属性选择器。',
    })
    dataSchema: T;

    @Prop<ElCalendarOptions<T, V, P, M, C>, 'startKey'>({
      group: '数据属性',
      title: '开始时间字段',
      description: '数据内表示开始时间的字段',
      docDescription: '数据内表示开始时间的字段，要求对应数据必须包含日期（日期/日期时间格式），**单独使用表示当天**；跟结束时间字段配合使用表示日期区间，组件根据日期区间判断展示在哪些日期内。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    startKey: (item: T) => any = ((item: any) => item.startTime) as any;

    @Prop<ElCalendarOptions<T, V, P, M, C>, 'endKey'>({
      group: '数据属性',
      title: '结束时间字段',
      description: '数据内表示结束时间的字段',
      docDescription: '数据内表示结束时间的字段，要求对应数据必须包含日期（日期/日期时间格式），跟开始时间字段配合使用表示日期区间，组件根据时间区间判断展示在哪些日期内。',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    endKey: (item: T) => any = ((item: any) => item.endTime) as any;

    @Slot({
      title: '日期单元格',
      description: '自定义日期单元格内容。参数为 { type, isSelected, day, date }，type 表示该日期的所属月份，可选值有 prev-month、current-month、next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 YYYY-MM-DD；date 是单元格的日期',
    })
    slotCell: (current: {
      item:T,
      isSelected:nasl.core.Boolean,
      day:nasl.core.String,
      date:nasl.core.Date,
    }) => Array<ViewComponent>;

    @Slot({
      title: '头部',
      description: '自定义日历头部内容',
    })
    slotHeader: (current: { date: nasl.core.Date }) => Array<ViewComponent>;

    // @Method({
    //   title: '选择日期',
    //   description: '选择一个特定的日期',
    // })
    // pickDay(day: nasl.core.Date): void;

    // @Method({
    //   title: '选择日期',
    //   description: '选择日期',
    // })
    // selectDate(date: nasl.core.Date): void;
  }
} 
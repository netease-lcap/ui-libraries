/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '日历',
    icon: 'calendar',
    description: '显示日期',
    group: 'Table',
  })
  export class ElCalendar extends ViewComponent {
    constructor(options?: Partial<ElCalendarOptions>) {
      super();
    }
  }

  export class ElCalendarOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Date | nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '时间范围',
      description: '时间范围，包括开始时间与结束时间。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月',
      setter: { concept: 'InputSetter' },
    })
    range: nasl.collection.List<nasl.core.Date | nasl.core.String>;

    @Slot({
      title: '日期单元格',
      description: '自定义日期单元格内容。参数为 { type, isSelected, day, date }，type 表示该日期的所属月份，可选值有 prev-month、current-month、next-month；isSelected 标明该日期是否被选中；day 是格式化的日期，格式为 YYYY-MM-DD；date 是单元格的日期',
    })
    slotDateCell: (current: {
      type: 'prev-month' | 'current-month' | 'next-month';
      isSelected: nasl.core.Boolean;
      day: nasl.core.String;
      date: nasl.core.Date;
    }) => Array<ViewComponent>;

    @Slot({
      title: '头部',
      description: '自定义日历头部内容',
    })
    slotHeader: (scope: { date: nasl.core.Date }) => Array<ViewComponent>;

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
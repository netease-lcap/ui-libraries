/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      forceUpdateWhenAttributeChange: true,
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
      group: '主要属性',
      sync: true,
      title: '值',
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Date | nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '范围',
      description:
        '时间范围，包括开始时间与结束时间。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。如 ["2019-01-08","2019-01-28"]',
      setter: { concept: 'InputSetter' },
    })
    range: any[];

    @Prop({
      group: '主要属性',
      title: '周起始日',
      description: '周起始日',
      setter: { concept: 'NumberInputSetter' },
    })
    firstDayOfWeek: nasl.core.Decimal = 1;

    @Slot({
      title: '卡片内容',
      description: '卡片内容',
    })
    slotDateCell: () => Array<ViewComponent>;
  }
}

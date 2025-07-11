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
    description: '日历展示',
    group: 'Table',
  })
  export class VanCalendar extends ViewComponent {
    constructor(options?: Partial<VanCalendarOptions>) {
      super();
    }
  }

  export class VanCalendarOptions extends ViewComponentOptions {
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


    @Prop({
      group: '状态属性',
      sync: true,
      title: '显示',
      description: '是否显示日历',
      setter: { concept: 'SwitchSetter' },
    })
    show: nasl.core.Boolean = false;
    
  }
}

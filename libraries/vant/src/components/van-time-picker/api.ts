/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '时间选择器',
    icon: 'time-picker',
    description: '时间选择器',
    group: 'Selector',
  })
  export class VanTimePicker extends ViewComponent {
    constructor(options?: Partial<VanTimePickerOptions>) {
      super();
    }
  }

  export class VanTimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Date | nasl.core.String;

  }
}

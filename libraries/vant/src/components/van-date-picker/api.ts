/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '日期选择器',
    icon: 'date-picker',
    description: '日期选择器',
    group: 'Selector',
  })
  export class VanDatePicker extends ViewComponent {
    constructor(options?: Partial<VanDatePickerOptions>) {
      super();
    }
  }

  export class VanDatePickerOptions extends ViewComponentOptions {
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

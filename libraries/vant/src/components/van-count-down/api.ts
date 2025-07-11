/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '倒计时',
    icon: 'count-down',
    description: '倒计时',
    group: 'Display',
  })
  export class VanCountDown extends ViewComponent {
    constructor(options?: Partial<VanCountDownOptions>) {
      super();
    }
  }

  export class VanCountDownOptions extends ViewComponentOptions {
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

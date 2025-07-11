/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '返回顶部',
    icon: 'back-top',
    description: '返回顶部',
    group: 'Display',
  })
  export class VanBackTop extends ViewComponent {
    constructor(options?: Partial<VanBackTopOptions>) {
      super();
    }
  }

  export class VanBackTopOptions extends ViewComponentOptions {
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

/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '标签栏',
    icon: 'tabbar',
    description: '标签栏',
    group: 'Navigation',
  })
  export class VanTabbar extends ViewComponent {
    constructor(options?: Partial<VanTabbarOptions>) {
      super();
    }
  }

  export class VanTabbarOptions extends ViewComponentOptions {
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

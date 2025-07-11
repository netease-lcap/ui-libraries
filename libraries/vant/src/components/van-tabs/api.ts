/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '标签页',
    icon: 'tabs',
    description: '标签页',
    group: 'Display',
  })
  export class VanTabs extends ViewComponent {
    constructor(options?: Partial<VanTabsOptions>) {
      super();
    }
  }

  export class VanTabsOptions extends ViewComponentOptions {
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

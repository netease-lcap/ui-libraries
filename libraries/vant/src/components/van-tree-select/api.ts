/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '树形选择',
    icon: 'tree-select',
    description: '树形选择',
    group: 'Selector',
  })
  export class VanTreeSelect extends ViewComponent {
    constructor(options?: Partial<VanTreeSelectOptions>) {
      super();
    }
  }

  export class VanTreeSelectOptions extends ViewComponentOptions {
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

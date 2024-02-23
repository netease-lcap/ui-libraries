


/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '流程记录',
    icon: 'table-view',
    description: '',
    group: 'Process'
  })
  export class VanProcessRecord extends ViewComponent {

    constructor(options?: Partial<VanProcessRecordOptions>) { super(); }
  }

  export class VanProcessRecordOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '展示类型',
      description: '',
      sync: true,
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '列表'
        }, {
          title: '时间轴'
        }]
      },
    })
    type: 'list' | 'timeline' = 'list';
  }
}


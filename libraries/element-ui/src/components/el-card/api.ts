/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '卡片',
    icon: 'card',
    description: '将信息聚合在卡片容器中展示。',
    group: 'Container',
  })
  export class ElCard extends ViewComponent {
    constructor(options?: Partial<ElCardOptions>) {
      super();
    }
  }

  export class ElCardOptions extends ViewComponentOptions {


    // @Prop({
    //   group: '主要属性',
    //   title: '设置 body 的样式',
    //   description: '设置 body 的样式',
    //   setter: { concept: 'InputSetter' },
    // })
    // bodyStyle: object = { padding: '20px' };

    @Prop({
      group: '主要属性',
      title: '设置阴影显示时机',
      description: '设置阴影显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '总是' }, { title: '悬浮' }, { title: '不显示' }],
      },
    })
    shadow: 'always' | 'hover' | 'never' = 'always';

    @Slot({
      title: '卡片内容',
      description: '卡片内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '卡片头部',
      description: '卡片头部',
    })
    slotHeader: () => Array<ViewComponent>;
  }
}

/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '卡片',
    icon: 'card',
    description: '将信息聚合在卡片容器中展示',
    group: 'Container',
  })
  export class ElCard extends ViewComponent {
    constructor(options?: Partial<ElCardOptions>) {
      super();
    }
  }

  export class ElCardOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '阴影显示时机',
      description: '设置阴影显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '总是显示' }, { title: '悬浮显示' }, { title: '从不显示' }],
      },
    })
    shadow: 'always' | 'hover' | 'never' = 'always';

    @Slot({
      title: '默认',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '自定义标题内容',
    })
    slotHeader: () => Array<ViewComponent>;

    @Slot({
      title: '页脚',
      description: '自定义页脚内容',
    })
    slotFooter: () => Array<ViewComponent>;
  }
}

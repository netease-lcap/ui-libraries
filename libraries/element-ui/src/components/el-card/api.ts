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
    @Prop({
      group: '主要属性',
      title: '设置卡片头部',
      description: '设置 header，也可以通过 `slot#header` 传入 DOM',
      setter: { concept: 'InputSetter' },
    })
    header: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '设置 body 的样式',
      description: '设置 body 的样式',
      setter: { concept: 'InputSetter' },
    })
    bodyStyle: object = { padding: '20px' };

    @Prop({
      group: '主要属性',
      title: '设置阴影显示时机',
      description: '设置阴影显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'always' }, { title: 'hover' }, { title: 'never' }],
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

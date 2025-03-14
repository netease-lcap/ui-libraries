/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
  })
  @Component({
    title: '页头',
    icon: 'pageheader',
    description: '如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。',
    group: 'Navigation',
  })
  export class ElPageHeader extends ViewComponent {
    constructor(options?: Partial<ElPageHeaderOptions>) {
      super();
    }
  }

  export class ElPageHeaderOptions extends ViewComponentOptions {
    @Prop({
      title: '图标',
      description: 'Page Header 的图标 Icon 组件',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '主标题',
      description: 'Page Header 的主标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '内容',
      description: 'Page Header 的内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String = '';

    @Event({
      title: '点击左侧区域触发',
      description: '点击左侧区域触发',
    })
    onBack: (event: any) => any;

    @Slot({
      title: '标题内容',
      description: '标题内容',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotContent: () => Array<ViewComponent>;

    @Slot({
      title: '图标内容',
      description: '图标内容',
    })
    slotIcon: () => Array<ViewComponent>;

    @Slot({
      title: '扩展设置',
      description: '扩展设置',
    })
    slotExtra: () => Array<ViewComponent>;

    @Slot({
      title: '面包屑导航内容',
      description: '面包屑导航内容',
    })
    slotBreadcrumb: () => Array<ViewComponent>;

    @Slot({
      title: '默认内容',
      description: '默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
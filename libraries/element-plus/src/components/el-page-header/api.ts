/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      "idetype": "container",
      "disableSlotAutoFill": [
        {
          "slot": "breadcrumb",
          "expression": "!this.getAttribute('showBreadcrumb')?.value",
        },
        {
          "slot": "extra",
          "expression": "!this.getAttribute('showExtra')?.value",
        },
        {
          "slot": "default",
          "expression": "!this.getAttribute('showMainContent')?.value",
        }
      ]
    }
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
      group: '主要属性',
      title: '展示面包屑页头区域',
      description: '您可以通过添加插槽 breadcrumb 来设置面包屑路由导航',
      setter: { concept: 'SwitchSetter' },
    })
    showBreadcrumb: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '展示额外操作区域',
      description: '头部可能会变得很复杂，您可以在头部添加更多的区块，以允许丰富的交互。',
      setter: { concept: 'SwitchSetter' },
    })
    showExtra: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '展示主要内容区域',
      description: '让页头显示一些协同响应内容',
      setter: { concept: 'SwitchSetter' },
    })
    showMainContent: nasl.core.Boolean = false;

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
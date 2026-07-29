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
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '显示面包屑',
      description: '是否显示面包屑导航区域',
      docDescription: '开启后，页头顶部会显示面包屑导航区域。可以通过插槽自定义面包屑内容。',
      setter: { concept: 'SwitchSetter' },
    })
    showBreadcrumb: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示操作区',
      description: '是否显示额外操作区域',
      docDescription: '开启后，页头右侧会显示额外操作区域，可以添加按钮等交互元素。',
      setter: { concept: 'SwitchSetter' },
    })
    showExtra: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示内容区',
      description: '是否显示主要内容区域',
      docDescription: '开启后，页头下方会显示主要内容区域，用于展示协同响应的内容。',
      setter: { concept: 'SwitchSetter' },
    })
    showMainContent: nasl.core.Boolean = false;

    @Event({
      title: '点击左侧区域触发',
      description: '点击左侧区域触发',
    })
    onBack: () => void;

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